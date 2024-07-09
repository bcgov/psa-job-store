import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaders } from 'axios';
import { clientCredentials } from 'axios-oauth-client';
import { Cache } from 'cache-manager';
import { EMPTY, catchError, expand, firstValueFrom, lastValueFrom, map, reduce, retry } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { guidToUuid } from '../../utils/guid-to-uuid.util';
import { FindManyKeycloakUserArgs } from './args/find-many-keycloak-user.args';
import { KeycloakUser } from './models/keycloak-user.model';

interface ClientCredentials {
  access_token: string;
  expires_in: number;
  refres_expires_in: number;
  token_type: string;
  'not-before-policy': number;
  scope: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  roles: string[];
}

export type UserWithoutRoles = Omit<User, 'roles'>;

@Injectable()
export class KeycloakService {
  private readonly headers: AxiosHeaders = new AxiosHeaders();
  private readonly KEYCLOAK_API_CREDENTIALS_KEY: string = 'KEYCLOAK_API_CREDENTIALS_KEY';

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly httpService: HttpService,
  ) {}

  private async getAuth() {
    let auth = await this.cacheManager.get<ClientCredentials>(this.KEYCLOAK_API_CREDENTIALS_KEY);

    if (auth == null) {
      try {
        const credentials = await clientCredentials(
          this.httpService.axiosRef,
          this.configService.get('KEYCLOAK_API_TOKEN_URL'),
          this.configService.get('KEYCLOAK_API_SERVICE_ACCOUNT_CLIENT_ID'),
          this.configService.get('KEYCLOAK_API_SERVICE_ACCOUNT_CLIENT_SECRET'),
        )('');

        await this.cacheManager.set(this.KEYCLOAK_API_CREDENTIALS_KEY, credentials, credentials.expires_in * 1000);
        auth = await this.cacheManager.get<ClientCredentials>(this.KEYCLOAK_API_CREDENTIALS_KEY);
      } catch (error) {
        console.error('Could not get Keycloak API access_token');
      }
    }

    return auth;
  }

  private async preflight() {
    const auth = await this.getAuth();

    // Update the Authorization header if needed
    if (auth != null) {
      const str = `${auth.token_type} ${auth.access_token}`;
      if (this.headers.get('Authorization') !== str) this.headers.set('Authorization', str);
    } else {
      this.headers.delete('Authorization');
    }
  }

  private async getUsersForRole(role: string): Promise<UserWithoutRoles[]> {
    await this.preflight();

    const request = (page: number = 1) =>
      this.httpService.get(
        [
          this.configService.get('KEYCLOAK_API_URL'),
          'integrations',
          this.configService.get('KEYCLOAK_API_INTEGRATION_ID'),
          this.configService.get('KEYCLOAK_API_ENVIRONMENT'),
          'roles',
          role,
          `users?page=${page}&max=50`,
        ].join('/'),
        { headers: this.headers },
      );

    // The following is inspired by https://stackoverflow.com/a/68690997
    const users = await lastValueFrom(
      request().pipe(
        // Repeat the request if response.data is not an empty array.
        expand((r) => (Array.isArray(r.data.data) && r.data.data.length > 0 ? request(r.data.page + 1) : EMPTY)),
        // Stitch results from all pages together
        reduce((acc, response) => {
          return [
            ...acc,
            ...response.data.data.map((user: KeycloakUser): UserWithoutRoles => {
              const { email, attributes } = user;
              const { id, display_name, username } = {
                id: attributes.idir_user_guid[0],
                display_name: attributes.display_name[0],
                username: attributes.idir_username[0],
              };
              return {
                id: guidToUuid(id),
                name: display_name,
                email,
                username,
              };
            }),
          ];
        }, []),
      ),
    );

    return users;
  }

  async findUsers(args: FindManyKeycloakUserArgs) {
    await this.preflight();

    const { field, value } = args;

    const request = () =>
      this.httpService.get(
        [
          this.configService.get('KEYCLOAK_API_URL'),
          this.configService.get('KEYCLOAK_API_ENVIRONMENT'),
          `idir/users?${field}=${value}`,
        ].join('/'),
        { headers: this.headers },
      );

    const users = await firstValueFrom(
      request().pipe(
        map((r) => r.data.data),
        catchError((err) => {
          throw new Error(err);
        }),
      ),
    );

    return users;
  }

  async getRoles(): Promise<string[]> {
    await this.preflight();

    const roles = await firstValueFrom(
      this.httpService
        .get(
          [
            this.configService.get('KEYCLOAK_API_URL'),
            'integrations',
            this.configService.get('KEYCLOAK_API_INTEGRATION_ID'),
            this.configService.get('KEYCLOAK_API_ENVIRONMENT'),
            'roles',
          ].join('/'),
          { headers: this.headers },
        )
        .pipe(
          map((r) => r.data.data.map((d) => d.name)),
          retry(3),
          catchError((err) => {
            throw new Error(err);
          }),
        ),
    );

    return roles;
  }

  async getUsersForRoles(roles: string[]) {
    const roleUsers: Map<string, UserWithoutRoles[]> = new Map();

    for await (const role of roles) {
      const usersForRole = await this.getUsersForRole(role);
      roleUsers.set(role, usersForRole);
    }

    const merged = this.mergeUsers(roleUsers);

    return merged;
  }

  async mergeUsers(roleUsers: Map<string, UserWithoutRoles[]>): Promise<User[]> {
    const mergedUsers: Map<string, User> = new Map();

    for (const [role, users] of Array.from(roleUsers.entries())) {
      users.forEach((user) => {
        const { id, name, email, username } = user;

        let match: User | undefined = mergedUsers.get(user.id);
        if (match == null) {
          // Create new entry
          match = {
            id: id,
            name: name,
            email: email,
            username: username,
            roles: [role],
          };
        } else {
          // Update existing entry
          const { roles, ...rest } = match;
          match = {
            ...rest,
            roles: [...roles, role],
          };
        }

        mergedUsers.set(id, match);
      });
    }

    return Array.from([...mergedUsers.values()]);
  }

  async getUsers(): Promise<User[]> {
    const roles = await this.getRoles();
    const users = await this.getUsersForRoles(roles);

    return users;
  }
}
