import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Classification,
  JobProfile,
  JobProfileBehaviouralCompetency,
  JobProfileCreateInput,
  JobProfileReportsTo,
  Organization,
} from '../../@generated/prisma-nestjs-graphql';
import { AlexandriaError } from '../../utils/alexandria-error';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { AllowNoRoles } from '../auth/guards/role-global.guard';
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

  @Query(() => Int, { name: 'pageNumberForSelectProfile' })
  async pageNumberForSelectProfile(@Args() args?: FindManyJobProfileWithSearch) {
    return await this.jobProfileService.getPageNumberForSelectProfile(args);
  }

  @Query(() => Int, { name: 'jobProfilesCount' })
  async jobProfilesCount(@Args() args?: FindManyJobProfileWithSearch) {
    return await this.jobProfileService.getJobProfileCount(args);
  }

  @Query(() => [JobProfile], { name: 'jobProfilesDrafts' })
  @Roles('total-compensation')
  @UseGuards(RoleGuard)
  async getJobProfilesDrafts(@CurrentUser() { id: userId }: Express.User, @Args() args?: FindManyJobProfileWithSearch) {
    return this.jobProfileService.getJobProfilesDrafts(args, userId);
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

  @Query(() => [JobProfile], { name: 'jobProfilesArchived' })
  @Roles('total-compensation')
  @UseGuards(RoleGuard)
  async getJobProfilesArchived(
    @CurrentUser() { id: userId }: Express.User,
    @Args() args?: FindManyJobProfileWithSearch,
  ) {
    return this.jobProfileService.getJobProfilesArchived(args, userId);
  }

  @Query(() => Int, { name: 'jobProfilesArchivedCount' })
  @Roles('total-compensation')
  @UseGuards(RoleGuard)
  async jobProfilesArchivedCount(
    @CurrentUser() { id: userId }: Express.User,
    @Args() args?: FindManyJobProfileWithSearch,
  ) {
    return await this.jobProfileService.getJobProfilesArchivedCount(args, userId);
  }

  @Query(() => [Organization], { name: 'jobProfilesDraftsMinistries' })
  @Roles('total-compensation')
  @UseGuards(RoleGuard)
  async getJobProfilesDraftsMinistries(@CurrentUser() { id: userId }: Express.User) {
    return this.jobProfileService.getJobProfilesDraftsMinistries(userId);
  }

  @Query(() => JobProfile, { name: 'jobProfile' })
  @AllowNoRoles() // so that share position request feature can fetch relevant data
  async getJobProfile(@Args('id') id: string) {
    return this.jobProfileService.getJobProfile(+id);
  }

  // @Query(() => [JobProfileCareerGroup], { name: 'jobProfilesCareerGroups' })
  // async getJobProfilesCareerGroups() {
  //   return this.jobProfileService.getJobProfilesCareerGroups();
  // }

  // @Roles('total-compensation')
  // @UseGuards(RoleGuard)
  // @Query(() => [JobProfileCareerGroup], { name: 'jobProfilesDraftsCareerGroups' })
  // async getJobProfilesDraftsCareerGroups(@CurrentUser() { id: userId }: Express.User) {
  //   return this.jobProfileService.getJobProfilesDraftsCareerGroups(userId);
  // }

  @Query(() => [Organization], { name: 'jobProfilesMinistries' })
  async getJobProfilesMinistries(
    @Args('positionRequestId', { type: () => Int, nullable: true }) positionRequestId?: number,
  ) {
    return this.jobProfileService.getJobProfilesMinistries(positionRequestId);
  }

  @Query(() => [Classification], { name: 'jobProfilesClassifications' })
  async getJobProfilesClassifications() {
    return this.jobProfileService.getJobProfilesClassifications();
  }

  @Query(() => [Classification], { name: 'jobProfilesDraftsClassifications' })
  @Roles('total-compensation')
  @UseGuards(RoleGuard)
  async getJobProfilesDraftsClassifications() {
    return this.jobProfileService.getJobProfilesDraftsClassifications();
  }

  @ResolveField(() => JobProfileBehaviouralCompetency)
  async behavioural_competencies(@Parent() { id }: JobProfile) {
    return this.jobProfileService.getBehaviouralCompetencies(id);
  }

  @Mutation(() => Int)
  @Roles('total-compensation')
  @UseGuards(RoleGuard)
  async createOrUpdateJobProfile(
    @CurrentUser() { id: userId }: Express.User,
    @Args('id', { type: () => Int, nullable: true }) id: number | null,
    @Args({ name: 'data', type: () => JobProfileCreateInput }) data: JobProfileCreateInput,
  ) {
    try {
      const newJobProfile = await this.jobProfileService.createOrUpdateJobProfile(data, userId, id);
      return newJobProfile.id;
    } catch (error: any) {
      // Check if the error is due to a unique constraint failure on the 'number' field
      if (error.message.includes('Unique constraint failed on the fields: (`number`)')) {
        // Return a custom error response or throw a custom error
        // Modify this according to how you handle errors in your application
        throw AlexandriaError('A job profile with this number already exists. Please use a different number.');
      } else {
        // If the error is not due to the unique constraint, rethrow the error
        throw error;
      }
    }
  }

  @Mutation(() => Int)
  @Roles('total-compensation') // Adjust role as per your requirements
  @UseGuards(RoleGuard)
  async duplicateJobProfile(
    @CurrentUser() { id: userId }: Express.User,
    @Args('jobProfileId', { type: () => Int }) jobProfileId: number,
  ) {
    return this.jobProfileService.duplicateJobProfile(jobProfileId, userId);
  }

  @Mutation(() => Int)
  @Roles('total-compensation') // Adjust role as per your requirements
  @UseGuards(RoleGuard)
  async deleteJobProfile(
    @CurrentUser() { id: userId }: Express.User,
    @Args('jobProfileId', { type: () => Int }) jobProfileId: number,
  ) {
    return this.jobProfileService.deleteJobProfile(jobProfileId, userId);
  }

  @Mutation(() => Int)
  @Roles('total-compensation') // Adjust role as per your requirements
  @UseGuards(RoleGuard)
  async unarchiveJobProfile(
    @CurrentUser() { id: userId }: Express.User,
    @Args('jobProfileId', { type: () => Int }) jobProfileId: number,
  ) {
    return this.jobProfileService.unarchiveJobProfile(jobProfileId, userId);
  }

  @ResolveField(() => JobProfileReportsTo)
  async reports_to(@Parent() { id }: JobProfile) {
    return this.jobProfileService.getReportsTo(id);
  }

  @Query(() => Int, { name: 'nextAvailableJobProfileNumber' })
  async getNextAvailableJobProfileNumber() {
    return this.jobProfileService.getNextAvailableNumber();
  }

  @Query(() => Boolean, { name: 'isJobProfileNumberAvailable' })
  async checkJobProfileNumberAvailability(@Args('number', { type: () => Int }) number: number) {
    return this.jobProfileService.isNumberAvailable(number);
  }
}
