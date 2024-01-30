import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  JobProfile,
  JobProfileBehaviouralCompetency,
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
  async getJobProfilesMinistries() {
    return this.jobProfileService.getJobProfilesMinistries();
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
        throw new Error('A job profile with this number already exists. Please use a different number.');
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
