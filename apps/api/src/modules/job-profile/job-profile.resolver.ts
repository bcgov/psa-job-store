import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  JobProfile,
  JobProfileBehaviouralCompetency,
  JobProfileCareerGroup,
  JobProfileCreateInput,
  JobProfileReportsTo,
  Organization,
} from '../../@generated/prisma-nestjs-graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
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

  @Query(() => [JobProfile], { name: 'jobProfilesDrafts' })
  @Roles('total-compensation')
  @UseGuards(RoleGuard)
  async getJobProfilesDrafts(@CurrentUser() { id: userId }: Express.User, @Args() args?: FindManyJobProfileWithSearch) {
    return this.jobProfileService.getJobProfilesDrafts(args, userId);
  }

  @Query(() => Int, { name: 'jobProfilesCount' })
  async jobProfilesCount(@Args() args?: FindManyJobProfileWithSearch) {
    return await this.jobProfileService.getJobProfileCount(args);
  }

  @Query(() => Int, { name: 'jobProfilesDraftsCount' })
  @Roles('total-compensation')
  @UseGuards(RoleGuard)
  async jobProfilesDraftsCount(
    @CurrentUser() { id: userId }: Express.User,
    @Args() args?: FindManyJobProfileWithSearch,
  ) {
    return await this.jobProfileService.getJobProfilesDraftsCount(args, userId);
  }

  @Query(() => [Organization], { name: 'jobProfilesDraftsMinistries' })
  @Roles('total-compensation')
  @UseGuards(RoleGuard)
  async getJobProfilesDraftsMinistries(@CurrentUser() { id: userId }: Express.User) {
    return this.jobProfileService.getJobProfilesDraftsMinistries(userId);
  }

  @Query(() => JobProfile, { name: 'jobProfile' })
  async getJobProfile(@Args('id') id: string) {
    return this.jobProfileService.getJobProfile(+id);
  }

  @Query(() => [JobProfileCareerGroup], { name: 'jobProfilesCareerGroups' })
  async getJobProfilesCareerGroups() {
    return this.jobProfileService.getJobProfilesCareerGroups();
  }

  @Roles('total-compensation')
  @UseGuards(RoleGuard)
  @Query(() => [JobProfileCareerGroup], { name: 'jobProfilesDraftsCareerGroups' })
  async getJobProfilesDraftsCareerGroups(@CurrentUser() { id: userId }: Express.User) {
    return this.jobProfileService.getJobProfilesDraftsCareerGroups(userId);
  }

  @Query(() => [Organization], { name: 'jobProfilesMinistries' })
  async getJobProfilesMinistries() {
    return this.jobProfileService.getJobProfilesMinistries();
  }

  @ResolveField(() => JobProfileBehaviouralCompetency)
  async behavioural_competencies(@Parent() { id }: JobProfile) {
    return this.jobProfileService.getBehaviouralCompetencies(id);
  }

  @Mutation(() => Int)
  async createJobProfile(
    // @CurrentUser() { id: userId }: Express.User,
    @Args({ name: 'data', type: () => JobProfileCreateInput }) data: JobProfileCreateInput,
  ) {
    // console.log('create DATA: ', data);
    const newJobProfile = await this.jobProfileService.createJobProfile(data);
    return newJobProfile.id;
  }

  @ResolveField(() => JobProfileReportsTo)
  async reports_to(@Parent() { id }: JobProfile) {
    return this.jobProfileService.getReportsTo(id);
  }
}
