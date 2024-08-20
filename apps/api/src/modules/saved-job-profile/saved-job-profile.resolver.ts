import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AllowNoRoles } from '../auth/guards/role-global.guard';
import { SavedJobProfileService } from './saved-job-profile.service';

@Resolver()
export class SavedJobProfileResolver {
  constructor(private readonly savedJobProfileService: SavedJobProfileService) {}

  @AllowNoRoles()
  @Mutation(() => Boolean, { name: 'saveJobProfile' })
  async saveJobProfile(@CurrentUser() { id: userId }: Express.User, @Args('jobProfileId') jobProfileId: number) {
    return this.savedJobProfileService.saveJobProfile(userId, jobProfileId);
  }

  @AllowNoRoles()
  @Mutation(() => Boolean)
  async removeSavedJobProfile(@CurrentUser() { id: userId }: Express.User, @Args('jobProfileId') jobProfileId: number) {
    return this.savedJobProfileService.removeSavedJobProfile(userId, jobProfileId);
  }

  @AllowNoRoles()
  @Query(() => [Number])
  async getSavedJobProfileIds(@CurrentUser() { id: userId }: Express.User) {
    return this.savedJobProfileService.getSavedJobProfileIds(userId);
  }
}
