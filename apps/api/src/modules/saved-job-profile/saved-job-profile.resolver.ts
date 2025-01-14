import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlCurrentUser } from '../auth/decorators/gql-current-user.decorator';
import { SavedJobProfileService } from './saved-job-profile.service';

@Resolver()
export class SavedJobProfileResolver {
  constructor(private readonly savedJobProfileService: SavedJobProfileService) {}

  @Mutation(() => Boolean, { name: 'saveJobProfile' })
  async saveJobProfile(@GqlCurrentUser() { id: userId }: Express.User, @Args('jobProfileId') jobProfileId: number) {
    return this.savedJobProfileService.saveJobProfile(userId, jobProfileId);
  }

  @Mutation(() => Boolean)
  async removeSavedJobProfile(
    @GqlCurrentUser() { id: userId }: Express.User,
    @Args('jobProfileId') jobProfileId: number,
  ) {
    return this.savedJobProfileService.removeSavedJobProfile(userId, jobProfileId);
  }

  @Query(() => [Number])
  async getSavedJobProfileIds(@GqlCurrentUser() { id: userId }: Express.User) {
    return this.savedJobProfileService.getSavedJobProfileIds(userId);
  }
}
