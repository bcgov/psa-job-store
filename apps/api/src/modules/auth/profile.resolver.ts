import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { CACHE_USER_PREFIX } from './auth.constants';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Profile } from './models/profile.model';

@ObjectType()
class LogoutResponse {
  @Field(() => Boolean, { nullable: false })
  success: boolean;
}

@Resolver(() => Profile)
export class ProfileResolver {
  private readonly logger = new Logger(ProfileResolver.name);

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly peoplesoftService: PeoplesoftService,
    private authService: AuthService,
  ) {}

  @Query(() => LogoutResponse, { name: 'logout' })
  async logout(@CurrentUser() { id: userId }: Express.User) {
    await this.authService.logoutUser(userId);
    return { success: true };
  }

  @Query(() => Profile, { name: 'profile' })
  async getProfile(@CurrentUser() { id }: Express.User) {
    const CACHE_KEY = `${CACHE_USER_PREFIX}${id}`;
    let match: Express.User = await this.cacheManager.get<Express.User>(CACHE_KEY);
    if (match == null) {
      const userFromDb = await this.authService.getUser(id);
      if (userFromDb != null) {
        const { id, name, email, username, roles, metadata } = userFromDb;

        match = {
          id,
          name,
          email,
          username,
          roles,
          metadata: metadata as Record<string, any>,
        };
      }
    }

    const { name, username, metadata } = match;

    return {
      id,
      name: name,
      username: username,
      department_id: process.env.TEST_ENV === 'true' ? '112-0072' : metadata?.peoplesoft?.department_id,
      employee_id: metadata?.peoplesoft?.employee_id,
      organization_id: metadata?.peoplesoft?.organization_id,
      position_id: metadata?.peoplesoft?.position_id,
      metadata: {
        crm: metadata.crm,
      },
    };
  }
}
