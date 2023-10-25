import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindManyJobProfileArgs, JobProfile } from '../../@generated/prisma-nestjs-graphql';
import { JobProfileService } from './job-profile.service';

@Resolver(() => JobProfile)
export class JobProfileResolver {
  constructor(private readonly jobProfileService: JobProfileService) {}

  @Query(() => [JobProfile], { name: 'jobProfiles' })
  async getJobProfiles(@Args() args?: FindManyJobProfileArgs) {
    console.log('args: ', args);
    return this.jobProfileService.getJobProfiles(args);
  }

  @Query(() => JobProfile, { name: 'jobProfile' })
  async getJobProfile(@Args('id') id: string) {
    return this.jobProfileService.getJobProfile(+id);
  }
}
