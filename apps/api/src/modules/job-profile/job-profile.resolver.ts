import { Args, Field, Int, Mutation, ObjectType, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Classification,
  JobProfile,
  JobProfileBehaviouralCompetency,
  JobProfileCreateInput,
  JobProfileJobFamily,
  JobProfileReportsTo,
  JobProfileStream,
  Organization,
} from '../../@generated/prisma-nestjs-graphql';
import { AlexandriaError } from '../../utils/alexandria-error';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JobFamilyService } from '../job-family/job-family.service';
import { FindManyJobProfileWithSearch } from './args/find-many-job-profile-with-search.args';
import { ClassificationInput } from './inputs/classification-requirements.inputs';
import { JobProfileService } from './job-profile.service';

@ObjectType()
class RequirementsWithoutReadOnlyResult {
  @Field(() => [RequirementWithoutReadOnly])
  professionalRegistrationRequirements: RequirementWithoutReadOnly[];

  @Field(() => [RequirementWithoutReadOnly], { nullable: true })
  preferences?: RequirementWithoutReadOnly[];

  @Field(() => [RequirementWithoutReadOnly], { nullable: true })
  knowledgeSkillsAbilities?: RequirementWithoutReadOnly[];

  @Field(() => [RequirementWithoutReadOnly], { nullable: true })
  willingnessStatements?: RequirementWithoutReadOnly[];

  @Field(() => [RequirementWithoutReadOnly], { nullable: true })
  securityScreenings?: RequirementWithoutReadOnly[];

  @Field(() => [RequirementWithoutReadOnly], { nullable: true })
  jobProfileMinimumRequirements?: RequirementWithoutReadOnly[];
}

@ObjectType()
class RequirementWithoutReadOnly {
  @Field(() => String)
  text: string;

  @Field(() => [JobProfileJobFamily])
  jobFamilies: JobProfileJobFamily[];

  @Field(() => [JobProfileStream])
  streams: JobProfileStream[];

  @Field(() => Classification, { nullable: true })
  classification?: {
    id: string;
    employee_group_id: string;
  };

  @Field(() => Organization, { nullable: true })
  organization?: {
    id: string;
  };
}
@ObjectType()
class PublishedBy {
  @Field(() => Date, { nullable: true })
  date: Date | null;

  @Field(() => String, { nullable: true })
  user: string | null;
}

@ObjectType()
class CreatedBy {
  @Field(() => Date, { nullable: true })
  date: Date | null;

  @Field(() => String, { nullable: true })
  owner: string | null;
}

@ObjectType()
class Version {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  version: number;
}

@ObjectType()
class JobProfileMetaModel {
  @Field(() => Int)
  totalViews: number;

  @Field(() => PublishedBy)
  firstPublishedBy: PublishedBy;

  @Field(() => CreatedBy)
  firstCreatedBy: CreatedBy;

  @Field(() => [Version])
  versions: Version[];
}

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

  @Mutation(() => Int, { name: 'updateJobProfileViewCount' })
  async updateJobProfileViewCount(@Args('jobProfiles', { type: () => [Int], nullable: true }) jobProfiles: number[]) {
    return await this.jobProfileService.updateJobProfileViewCountCache(jobProfiles);
  }
  @Query(() => JobProfileMetaModel, { name: 'jobProfileMeta' })
  async jobProfileMeta(@Args('id') id: number) {
    return await this.jobProfileService.getJobProfileMeta(id);
  }

  @Query(() => [JobProfile], { name: 'jobProfilesDrafts' })
  @Roles('total-compensation')
  async getJobProfilesDrafts(@CurrentUser() { id: userId }: Express.User, @Args() args?: FindManyJobProfileWithSearch) {
    return this.jobProfileService.getJobProfilesDrafts(args, userId);
  }

  @Query(() => Int, { name: 'jobProfilesDraftsCount' })
  @Roles('total-compensation')
  async jobProfilesDraftsCount(
    @CurrentUser() { id: userId }: Express.User,
    @Args() args?: FindManyJobProfileWithSearch,
  ) {
    return await this.jobProfileService.getJobProfilesDraftsCount(args, userId);
  }

  @Query(() => [JobProfile], { name: 'jobProfilesArchived' })
  @Roles('total-compensation')
  async getJobProfilesArchived(
    @CurrentUser() { id: userId }: Express.User,
    @Args() args?: FindManyJobProfileWithSearch,
  ) {
    return this.jobProfileService.getJobProfilesArchived(args, userId);
  }

  @Query(() => Int, { name: 'jobProfilesArchivedCount' })
  @Roles('total-compensation')
  async jobProfilesArchivedCount(
    @CurrentUser() { id: userId }: Express.User,
    @Args() args?: FindManyJobProfileWithSearch,
  ) {
    return await this.jobProfileService.getJobProfilesArchivedCount(args, userId);
  }

  @Query(() => [Organization], { name: 'jobProfilesDraftsMinistries' })
  @Roles('total-compensation')
  async getJobProfilesDraftsMinistries(@CurrentUser() { id: userId }: Express.User) {
    return this.jobProfileService.getJobProfilesDraftsMinistries(userId);
  }

  @Query(() => JobProfile, { name: 'jobProfile' }) // so that share position request feature can fetch relevant data
  async getJobProfile(
    @CurrentUser() user: Express.User,
    @Args('id') id: number,
    @Args({ name: 'version', nullable: true }) version?: number,
  ) {
    const res = await this.jobProfileService.getJobProfile(+id, version, user.roles);
    return res;
  }

  @Query(() => JobProfile, { name: 'jobProfileByNumber' }) // so that share position request feature can fetch relevant data
  async getJobProfileByNumber(@CurrentUser() user: Express.User, @Args('number') number: string) {
    const res = await this.jobProfileService.getJobProfileByNumber(+number, user.roles);
    return res;
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
  async getJobProfilesDraftsClassifications() {
    return this.jobProfileService.getJobProfilesDraftsClassifications();
  }

  @ResolveField(() => JobProfileBehaviouralCompetency)
  async behavioural_competencies(@Parent() { id, version }: JobProfile) {
    return this.jobProfileService.getBehaviouralCompetencies(id, version);
  }

  @Mutation(() => Int)
  @Roles('total-compensation')
  async createOrUpdateJobProfile(
    @CurrentUser() { id: userId }: Express.User,
    @Args('id', { type: () => Int, nullable: true }) id: number | null,
    @Args({ name: 'data', type: () => JobProfileCreateInput }) data: JobProfileCreateInput,
  ) {
    try {
      const newJobProfile = await this.jobProfileService.createOrUpdateJobProfile(data, userId);
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
  async duplicateJobProfile(
    @CurrentUser() { id: userId }: Express.User,
    @Args('jobProfileId', { type: () => Int }) jobProfileId: number,
    @Args('jobProfileVersion', { type: () => Int }) jobProfileVersion: number,
  ) {
    return this.jobProfileService.duplicateJobProfile(jobProfileId, jobProfileVersion, userId);
  }

  @Mutation(() => Int)
  @Roles('total-compensation') // Adjust role as per your requirements
  async deleteJobProfile(
    @CurrentUser() { id: userId }: Express.User,
    @Args('jobProfileId', { type: () => Int }) jobProfileId: number,
  ) {
    return this.jobProfileService.deleteJobProfile(jobProfileId, userId);
  }

  @Mutation(() => Int)
  @Roles('total-compensation') // Adjust role as per your requirements
  async unarchiveJobProfile(
    @CurrentUser() { id: userId }: Express.User,
    @Args('jobProfileId', { type: () => Int }) jobProfileId: number,
  ) {
    return this.jobProfileService.unarchiveJobProfile(jobProfileId, userId);
  }

  @Mutation(() => Boolean)
  @Roles('total-compensation')
  async updateJobProfileState(
    @CurrentUser() { id: userId }: Express.User,
    @Args('jobProfileId', { type: () => Int }) jobProfileId: number,
    @Args('jobProfileVersion', { type: () => Int }) jobProfileVersion: number,

    @Args('state') state: string,
  ) {
    return this.jobProfileService.updateJobProfileState(jobProfileId, jobProfileVersion, state, userId);
  }

  @ResolveField(() => JobProfileReportsTo)
  async reports_to(@Parent() { id, version }: JobProfile) {
    return this.jobProfileService.getReportsTo(id, version);
  }

  @Query(() => Int, { name: 'nextAvailableJobProfileNumber' })
  async getNextAvailableJobProfileNumber() {
    return this.jobProfileService.getNextAvailableNumber();
  }

  @Query(() => Boolean, { name: 'isJobProfileNumberAvailable' })
  async checkJobProfileNumberAvailability(@Args('number', { type: () => Int }) number: number) {
    return this.jobProfileService.isNumberAvailable(number);
  }

  @Query(() => RequirementsWithoutReadOnlyResult, { name: 'requirementsWithoutReadOnly' })
  async getRequirementsWithoutReadOnly(
    @Args('jobFamilyIds', { type: () => [Int] }) jobFamilyIds: number[],
    @Args('jobFamilyStreamIds', { type: () => [Int] }) jobFamilyStreamIds: number[],
    @Args('classifications', { type: () => [ClassificationInput], nullable: true })
    classifications?: ClassificationInput[],
    @Args('ministryIds', { type: () => [String], nullable: true }) ministryIds?: string[],
    @Args('jobFamilyWithNoStream', { type: () => [Int], nullable: true }) jobFamilyWithNoStream?: number[],
    @Args('excludeProfileId', { type: () => Int, nullable: true }) excludeProfileId?: number,
    @Args('excludeProfileId', { type: () => Int, nullable: true }) excludeProfileVersion?: number,
  ) {
    return this.jobProfileService.getRequirementsWithoutReadOnly(
      jobFamilyIds,
      jobFamilyStreamIds,
      classifications,
      ministryIds,
      jobFamilyWithNoStream ?? [],
      excludeProfileId,
      excludeProfileVersion,
    );
  }
}
