import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { JwtPayload } from 'jsonwebtoken';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { guidToUuid } from '../../utils/guid-to-uuid.util';
import { CrmService } from '../external/crm.service';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
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
    private readonly userService: UserService,
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

  getExpectedKeyCloakIssuer(): string {
    return this.configService.get('KEYCLOAK_REALM_URL');
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    return user;
  }

  async getUserFromPayload(data: JwtPayload) {
    // Get User ID from payload
    const { idir_user_guid, exp } = data;
    const uuid = guidToUuid(idir_user_guid);

    // Attempt to find user in the cache
    const CACHE_KEY = `${CACHE_USER_PREFIX}${uuid}`;
    let match = await this.cacheManager.get<Express.User>(CACHE_KEY);

    if (!match) {
      // Attempt to find the user in the database
      let user = await this.userService.getUser({ where: { id: uuid } });

      // If user doesn't exist in the database, sync the user
      if (!user) {
        await this.userService.syncUser(uuid);
        user = await this.userService.getUser({ where: { id: uuid } });
      }

      // Add the user to the cache
      await this.cacheManager.set(CACHE_KEY, user, (exp ?? 0) * 1000 - Date.now());
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

  async logoutUser(id: string): Promise<void> {
    const CACHE_KEY = `${CACHE_USER_PREFIX}${id}`;

    // Delete user from cache if it exists (it may not exist because it's expired)
    if (await this.cacheManager.get<Express.User>(CACHE_KEY)) {
      await this.cacheManager.del(CACHE_KEY);
    }
  }
}
