import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { JwtPayload } from 'jsonwebtoken';
import { catchError, firstValueFrom, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_USER_PREFIX, KEYCLOAK_PUBLIC_KEY } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly httpService: HttpService,
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

  async getUserFromPayload(data: JwtPayload) {
    console.log('getUserFromPayload data:', data);
    const { sub, identity_provider, name, email, client_roles, exp } = data;

    // const id = this.getUserIdFromSub(sub);

    const CACHE_KEY = `${CACHE_USER_PREFIX}${sub}-${identity_provider}`;
    let match = await this.cacheManager.get<Express.User>(CACHE_KEY); // try to get user from cache

    if (!match) {
      // user not in cache
      // Store User, Identity
      const identity = await this.prisma.identity.findUnique({
        // try to get user from db
        where: { sub_identity_provider: { identity_provider, sub } },
      });

      let id = '';
      if (identity) {
        // user was found in db, get id
        id = identity.user_id;
      } else {
        // user was not found in db, look up user in the user table by email
        const existingUser = await this.prisma.user.findUnique({
          where: { email },
        });
        // if found in user table, use that id, otherwise generate new one
        id = existingUser ? existingUser.id : uuidv4();
      }
      // create user object
      const user: Express.User = { id, name, email, roles: ((client_roles as string[]) ?? []).sort() };

      // upsert user and identity
      await this.upsertUser(user, sub, identity_provider);
      // set cache
      await this.cacheManager.set(CACHE_KEY, user, (exp ?? 0) * 1000 - Date.now());
      // get user from cache
      match = await this.cacheManager.get<Express.User>(CACHE_KEY);
    }

    return match;
  }

  async upsertUser(user: Express.User, sub: string, identity_provider: string) {
    const { id, ...rest } = user;

    const queries: any[] = [
      this.prisma.user.upsert({
        where: { id },
        create: { id, ...rest },
        update: { ...rest },
      }),
    ];

    if (identity_provider && sub) {
      queries.push(
        this.prisma.identity.upsert({
          where: { sub_identity_provider: { identity_provider, sub } },
          create: { sub, identity_provider, user_id: id },
          update: { sub, identity_provider, user_id: id },
        }),
      );
    }

    await this.prisma.$transaction(queries);
  }
}
