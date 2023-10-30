import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  FindManyJobProfileArgs,
  JobProfile,
  JobProfileBehaviouralCompetency,
} from '../../@generated/prisma-nestjs-graphql';
import { JobFamilyService } from '../job-family/job-family.service';
import { JobProfileService } from './job-profile.service';

@Resolver(() => JobProfile)
export class JobProfileResolver {
  constructor(
    private readonly jobFamilyService: JobFamilyService,
    private readonly jobProfileService: JobProfileService,
  ) {}

  @Query(() => [JobProfile], { name: 'jobProfiles' })
  async getJobProfiles(@Args() args?: FindManyJobProfileArgs) {
    return this.jobProfileService.getJobProfiles(args);
  }

  @Query(() => JobProfile, { name: 'jobProfile' })
  async getJobProfile(@Args('id') id: string) {
    return this.jobProfileService.getJobProfile(+id);
  }

  @ResolveField(() => JobProfileBehaviouralCompetency)
  async behavioural_competencies(@Parent() { id }: JobProfile) {
    return this.jobProfileService.getBehaviouralCompetencies(id);
  }
}
