import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  JobProfile,
  JobProfileBehaviouralCompetency,
  JobProfileCreateInput,
  JobProfileReportsTo,
} from '../../@generated/prisma-nestjs-graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JobFamilyService } from '../job-family/job-family.service';
import { FindManyJobProfileWithSearch } from './args/find-many-job-profile-with-search.args';
import { JobProfileService } from './job-profile.service';

@Resolver(() => JobProfile)
export class JobProfileResolver {
  constructor(
    private readonly jobFamilyService: JobFamilyService,
    private readonly jobProfileService: JobProfileService,
  ) {}

  @Query(() => [JobProfile], { name: 'jobProfiles' })
  async getJobProfiles(@Args() args?: FindManyJobProfileWithSearch) {
    return this.jobProfileService.getJobProfiles(args);
  }

  @Query(() => Int, { name: 'jobProfilesCount' })
  async jobProfilesCount(@Args() args?: FindManyJobProfileWithSearch) {
    return await this.jobProfileService.getJobProfileCount(args);
  }

  @Query(() => JobProfile, { name: 'jobProfile' })
  async getJobProfile(@Args('id') id: string) {
    return this.jobProfileService.getJobProfile(+id);
  }

  @ResolveField(() => JobProfileBehaviouralCompetency)
  async behavioural_competencies(@Parent() { id }: JobProfile) {
    return this.jobProfileService.getBehaviouralCompetencies(id);
  }

  @Mutation(() => Int)
  async createJobProfile(
    @CurrentUser() { id: userId }: Express.User,
    @Args({ name: 'data', type: () => JobProfileCreateInput }) data: JobProfileCreateInput,
  ) {
    // console.log('create DATA: ', data);
    data.owner = { connect: { id: userId } };
    const newJobProfile = await this.jobProfileService.createJobProfile(data);
    return newJobProfile.id;
  }

  @ResolveField(() => JobProfileReportsTo)
  async reports_to(@Parent() { id }: JobProfile) {
    return this.jobProfileService.getReportsTo(id);
  }
}
