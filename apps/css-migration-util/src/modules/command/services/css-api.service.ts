import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { MigrateCommandClientConfig, MigrateCommandIntegrationConfig } from '../dtos/migrate-command.dtos';
import { UsersWithRoles } from '../dtos/users-with-roles.dto';

@Injectable()
export class CssApiService {
  private readonly baseUrl: string = 'https://api.loginproxy.gov.bc.ca/api/v1';
  private readonly logger = new Logger(CssApiService.name);

  constructor(private readonly httpService: HttpService) {}

  private async getAccessToken(clientConfig: MigrateCommandClientConfig) {
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          `${this.baseUrl}/token`,
          {
            grant_type: 'client_credentials',
          },
          {
            headers: {
              Authorization: `Basic ${btoa(`${clientConfig.id}:${clientConfig.secret}`)}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw error;
          }),
        ),
    );

    const { access_token } = data;

    return access_token;
  }

  async assignRolesToUser(
    clientConfig: MigrateCommandClientConfig,
    integrationConfig: MigrateCommandIntegrationConfig,
    username: string,
    roles: { name: string }[],
  ) {
    this.logger.debug(`Assigning the following roles for user ${username}: ${roles.map((role) => role.name)}`);

    const access_token = await this.getAccessToken(clientConfig);

    await firstValueFrom(
      this.httpService
        .post(
          `${this.baseUrl}/integrations/${integrationConfig.id}/${integrationConfig.environment}/users/${username}/roles`,
          roles,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw error;
          }),
        ),
    );
  }

  async createRole(
    clientConfig: MigrateCommandClientConfig,
    integrationConfig: MigrateCommandIntegrationConfig,
    role: string,
  ) {
    this.logger.debug(`Creating ${role} role`);

    const access_token = await this.getAccessToken(clientConfig);

    const { data } = await firstValueFrom(
      this.httpService
        .post(
          `${this.baseUrl}/integrations/${integrationConfig.id}/${integrationConfig.environment}/roles`,
          {
            name: role,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw error;
          }),
        ),
    );
  }

  async getRoles(clientConfig: MigrateCommandClientConfig, integrationConfig: MigrateCommandIntegrationConfig) {
    this.logger.debug(`Fetching roles for integration ${integrationConfig.id}`);

    const access_token = await this.getAccessToken(clientConfig);

    const { data } = await firstValueFrom(
      this.httpService
        .get(`${this.baseUrl}/integrations/${integrationConfig.id}/${integrationConfig.environment}/roles`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw error;
          }),
        ),
    );

    const roles = data.data.map((d) => d.name);
    this.logger.debug(`Finished fetching roles from integration ${integrationConfig.id}: ${roles}`);

    return roles;
  }

  async getUsersAndRoles(
    clientConfig: MigrateCommandClientConfig,
    integrationConfig: MigrateCommandIntegrationConfig,
    roles: string[],
  ) {
    this.logger.debug('Fetching users and roles');
    // Stores user & role mappings
    // {
    //   [username]: [{ name: 'role 1'}, ...]
    // }
    const users: UsersWithRoles = {};

    // Fetch the list of users for each role
    for await (const role of roles) {
      this.logger.debug(`Fetching users for ${role} role`);
      // Loop through every page of users
      let page: number = 1;
      let fetchNextPage: boolean = true;

      while (fetchNextPage === true) {
        const pagedUsers = await this.getUsersForRole(clientConfig, integrationConfig, role, page);

        for (const user of pagedUsers) {
          users[user.username] = [...(users[user.username] ?? []), { name: role }];
        }

        if (pagedUsers.length === 0) {
          fetchNextPage = false;
        }
        page += 1;
      }

      this.logger.debug(`Finished fetching users for ${role} role`);
    }

    return users;
  }

  async getUsersForRole(
    clientConfig: MigrateCommandClientConfig,
    integrationConfig: MigrateCommandIntegrationConfig,
    role: string,
    page: number,
  ) {
    const access_token = await this.getAccessToken(clientConfig);

    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `${this.baseUrl}/integrations/${integrationConfig.id}/${integrationConfig.environment}/roles/${role}/users?page=${page}&max=50`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw error;
          }),
        ),
    );

    return data.data;
  }

  async migrateRolesAndUsers(
    clientConfig: MigrateCommandClientConfig,
    integrationConfig: MigrateCommandIntegrationConfig,
    roles: string[],
    users: UsersWithRoles,
  ) {
    const integrationRoles = await this.getRoles(clientConfig, integrationConfig);

    const rolesToCreate = roles.filter((role) => !integrationRoles.includes(role));
    if (rolesToCreate.length > 0) {
      this.logger.debug(`The following roles are missing: ${rolesToCreate}`);
      for (const role of rolesToCreate) {
        await this.createRole(clientConfig, integrationConfig, role);
      }
    }

    // Assign user roles in sequence
    for (const [username, roles] of Object.entries(users)) {
      await this.assignRolesToUser(clientConfig, integrationConfig, username, roles);
    }

    // DO NOT USE - will dos the server
    // --------------
    // Assign user roles in parallel
    // await Promise.all(
    //   Object.entries(users).map(async ([username, roles]) => {
    //     await this.assignRolesToUser(clientConfig, integrationConfig, username, roles);
    //   }),
    // );
  }
}
