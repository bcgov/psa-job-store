import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Classification, FindManyJobProfileArgs, JobProfile } from '../../@generated/prisma-nestjs-graphql';
import { JobProfileService } from './job-profile.service';

@Resolver(() => JobProfile)
export class JobProfileResolver {
  constructor(private readonly jobProfileService: JobProfileService) {}

  @Query(() => [JobProfile], { name: 'jobProfiles' })
  async getJobProfiles(@Args() args?: FindManyJobProfileArgs) {
    return this.jobProfileService.getJobProfiles(args);
  }

  @Query(() => JobProfile, { name: 'jobProfile' })
  async getJobProfile(@Args('id') id: string) {
    return this.jobProfileService.getJobProfile(+id);
  }

  @ResolveField(() => Classification)
  async classification(@Parent() jobProfile: JobProfile) {
    return this.jobProfileService.getClassification(jobProfile.classification_id);
  }
}
