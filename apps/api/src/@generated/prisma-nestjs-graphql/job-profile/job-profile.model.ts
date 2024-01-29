import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobProfileType } from '../prisma/job-profile-type.enum';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetency } from '../job-profile-behavioural-competency/job-profile-behavioural-competency.model';
import { JobProfileClassification } from '../job-profile-classification/job-profile-classification.model';
import { JobProfileOrganization } from '../job-profile-organization/job-profile-organization.model';
import { JobProfileContext } from '../job-profile-context/job-profile-context.model';
import { JobProfileRole } from '../job-profile-role/job-profile-role.model';
import { JobProfileRoleType } from '../job-profile-role-type/job-profile-role-type.model';
import { JobProfileScope } from '../job-profile-scope/job-profile-scope.model';
import { User } from '../user/user.model';
import { JobProfileJobFamilyLink } from '../job-profile-job-family-link/job-profile-job-family-link.model';
import { JobProfileStreamLink } from '../job-profile-stream-link/job-profile-stream-link.model';
import { JobProfileReportsTo } from '../job-profile-reports-to/job-profile-reports-to.model';
import { PositionRequest } from '../position-request/position-request.model';

@ObjectType()
export class JobProfile {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  role_id!: number;

  @Field(() => Int, { nullable: true })
  role_type_id!: number | null;

  @Field(() => Int, { nullable: true })
  scope_id!: number | null;

  @Field(() => JobProfileState, { nullable: false, defaultValue: 'DRAFT' })
  state!: keyof typeof JobProfileState;

  @Field(() => JobProfileType, { nullable: false })
  type!: keyof typeof JobProfileType;

  @Field(() => Date, { nullable: true })
  updated_at!: Date | null;

  @Field(() => String, { nullable: true })
  owner_id!: string | null;

  @Field(() => String, { nullable: true })
  program_overview!: string | null;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  review_required!: boolean | null;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: false })
  number!: number;

  @Field(() => String, { nullable: false })
  overview!: string;

  @Field(() => GraphQLJSON, { nullable: false, defaultValue: '{"optional": [], "required": []}' })
  accountabilities!: any;

  @Field(() => [String], { nullable: true })
  requirements!: Array<string>;

  @Field(() => [String], { nullable: true })
  professional_registration_requirements!: Array<string>;

  @Field(() => [String], { nullable: true })
  preferences!: Array<string>;

  @Field(() => [String], { nullable: true })
  knowledge_skills_abilities!: Array<string>;

  @Field(() => [String], { nullable: true })
  willingness_statements!: Array<string>;

  @Field(() => [String], { nullable: true })
  security_screenings!: Array<string>;

  @Field(() => GraphQLJSON, { nullable: true })
  total_comp_create_form_misc!: any | null;

  @Field(() => [JobProfileBehaviouralCompetency], { nullable: true })
  behavioural_competencies?: Array<JobProfileBehaviouralCompetency>;

  @Field(() => [JobProfileClassification], { nullable: true })
  classifications?: Array<JobProfileClassification>;

  @Field(() => [JobProfileOrganization], { nullable: true })
  organizations?: Array<JobProfileOrganization>;

  @Field(() => JobProfileContext, { nullable: true })
  context?: JobProfileContext | null;

  @Field(() => JobProfileRole, { nullable: true })
  role?: JobProfileRole | null;

  @Field(() => JobProfileRoleType, { nullable: true })
  role_type?: JobProfileRoleType | null;

  @Field(() => JobProfileScope, { nullable: true })
  scope?: JobProfileScope | null;

  @Field(() => User, { nullable: true })
  owner?: User | null;

  @Field(() => [JobProfileJobFamilyLink], { nullable: true })
  jobFamilies?: Array<JobProfileJobFamilyLink>;

  @Field(() => [JobProfileStreamLink], { nullable: true })
  streams?: Array<JobProfileStreamLink>;

  @Field(() => [JobProfileReportsTo], { nullable: true })
  reports_to?: Array<JobProfileReportsTo>;

  @Field(() => [PositionRequest], { nullable: true })
  position_request?: Array<PositionRequest>;
}
