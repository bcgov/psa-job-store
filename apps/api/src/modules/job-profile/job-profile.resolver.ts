import { Args, Query, Resolver } from '@nestjs/graphql';
import { JobProfile } from '../../@generated/prisma-nestjs-graphql';
import { JobProfileService } from './job-profile.service';
import { FindManyJobProfileWithSearchArgs } from './models/find-many-job-profile-with-search.args';

@Resolver(() => JobProfile)
export class JobProfileResolver {
  constructor(private readonly jobProfileService: JobProfileService) {}

  @Query(() => [JobProfile], { name: 'jobProfiles' })
  async getJobProfiles(@Args() args?: FindManyJobProfileWithSearchArgs) {
    console.log('args: ', args);
    return this.jobProfileService.getJobProfiles(args);
  }

  @Query(() => JobProfile, { name: 'jobProfile' })
  async getJobProfile(@Args('id') id: string) {
    return this.jobProfileService.getJobProfile(+id);
  }
}
