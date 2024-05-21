import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { isEmpty } from 'class-validator';
import { JwtPayload } from 'jsonwebtoken';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { CrmService } from '../external/crm.service';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_USER_PREFIX, KEYCLOAK_PUBLIC_KEY } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly crmService: CrmService,
    private readonly httpService: HttpService,
    private readonly peoplesoftService: PeoplesoftService,
    private readonly prisma: PrismaService,
  ) {}

  private async getKeycloakPublicKeyFromCache(): Promise<string | undefined> {
    const pk = await this.cacheManager.get<string | undefined>(KEYCLOAK_PUBLIC_KEY);
    return pk;
  }

  async getKeycloakPublicKey() {
    let pk = await this.getKeycloakPublicKeyFromCache();

    if (pk == null) {
      const response: Record<string, unknown> = await firstValueFrom(
        this.httpService
          .get(this.configService.get('KEYCLOAK_REALM_URL'))
          .pipe(map((r) => r.data))
          .pipe(
            catchError((err) => {
              throw new Error(err);
            }),
          ),
      );

      await this.cacheManager.set(
        KEYCLOAK_PUBLIC_KEY,
        `-----BEGIN PUBLIC KEY-----\n${response.public_key}\n-----END PUBLIC KEY-----`,
        5 * 60 * 1000,
      );

      pk = await this.getKeycloakPublicKeyFromCache();
    }

    return pk;
  }

  getExpectedKeyCloakClientIds(): string[] {
    return [this.configService.get('KEYCLOAK_CLIENT_ID_PRIVATE'), this.configService.get('KEYCLOAK_CLIENT_ID_PUBLIC')];
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    return user;
  }

  async getUserFromPayload(data: JwtPayload) {
    const { idir_user_guid, idir_username, name, email, client_roles, exp } = data;

    const CACHE_KEY = `${CACHE_USER_PREFIX}${idir_user_guid}`;
    let match = await this.cacheManager.get<Express.User>(CACHE_KEY);

    if (!match) {
      // If user doesn't exist in cache, update the persisted user
      let crmMetadata: Record<string, any> = {
        account_id: null,
        contact_id: null,
      };

      let orgChartMetadata: Record<string, any> = {
        department_ids: null,
      };

      let peoplesoftMetadata: Record<string, any> = {
        department_id: null,
        employee_id: null,
        organization_id: null,
        position_id: null,
      };

      const userFromDb = await this.prisma.user.findUnique({ where: { id: idir_user_guid } });
      if (userFromDb != null) {
        // Update CRM IDs
        if (
          userFromDb?.metadata?.['crm']['account_id'] == null ||
          userFromDb?.metadata?.['crm']['contact_id'] == null
        ) {
          const accountId = await this.crmService.getAccountId(idir_username);
          const contactId = await this.crmService.getContactId(idir_username);

          crmMetadata = {
            account_id: accountId ?? null,
            contact_id: contactId ?? null,
          };
        }

        // Update Peoplesoft IDs
        const peoplesoftProfile = (await this.peoplesoftService.getProfile(userFromDb.username))?.data?.query?.rows;
        const peoplesoftProfileData = (peoplesoftProfile ?? []).length > 0 ? peoplesoftProfile[0] : null;

        let employeeRows = [];
        let employee: Record<string, any> | null = null;
        if (peoplesoftProfileData != null && !isEmpty(peoplesoftProfileData.EMPLID)) {
          employeeRows = (await this.peoplesoftService.getEmployee(peoplesoftProfileData.EMPLID))?.data?.query?.rows;
          employee = (employeeRows ?? []).length > 0 ? employeeRows[0] : null;
        }

        peoplesoftMetadata = {
          department_id: employee?.DEPTID,
          employee_id: peoplesoftProfileData?.EMPLID,
          organization_id: employee?.BUSINESS_UNIT,
          position_id: employee?.POSITION_NBR,
        };

        // Update Org Chart Department IDs
        if (userFromDb?.metadata?.['org_chart']?.['department_ids'] == null) {
          orgChartMetadata = {
            department_ids: peoplesoftMetadata.department_id != null ? [peoplesoftMetadata.department_id] : null,
          };
        } else if (userFromDb.metadata['org_chart']['department_ids'] != null) {
          orgChartMetadata = userFromDb.metadata['org_chart'];
        }
      }

      const user = {
        id: idir_user_guid,
        name,
        email,
        username: idir_username,
        roles: ((client_roles as string[]) ?? []).sort(),
        metadata: {
          crm: crmMetadata,
          org_chart: orgChartMetadata,
          peoplesoft: peoplesoftMetadata,
        },
      };

      const upsertedUser = await this.upsertUser(user);

      // Add user to cache
      await this.cacheManager.set(CACHE_KEY, upsertedUser, (exp ?? 0) * 1000 - Date.now());
      match = await this.cacheManager.get<Express.User>(CACHE_KEY);
    }

    return match;
  }

  async upsertUser(user: Express.User) {
    const { id, ...rest } = user;

    const queries: any[] = [
      this.prisma.user.upsert({
        where: { id },
        create: { id, ...rest },
        update: { ...rest },
      }),
    ];
    await this.prisma.$transaction(queries);

    const upsertedUser = await this.prisma.user.findUnique({ where: { id } });
    return upsertedUser;
  }

  async logoutUser(idir_user_guid: string): Promise<void> {
    const CACHE_KEY = `${CACHE_USER_PREFIX}${idir_user_guid.replaceAll('-', '').toUpperCase()}`;

    // Check if the user is in the cache
    const userInCache = await this.cacheManager.get<Express.User>(CACHE_KEY);

    if (!userInCache) {
      // it's possible that the user is not in the cache because it's expired
      return;
      // throw new HttpException('User not found in cache', HttpStatus.NOT_FOUND);
    }

    // Remove the user from the cache
    await this.cacheManager.del(CACHE_KEY);
  }
}
