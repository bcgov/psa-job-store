import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobProfileType } from '../prisma/job-profile-type.enum';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyCreateNestedManyWithoutJob_profileInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-create-nested-many-without-job-profile.input';
import { JobProfileClassificationCreateNestedManyWithoutJob_profileInput } from '../job-profile-classification/job-profile-classification-create-nested-many-without-job-profile.input';
import { JobProfileOrganizationCreateNestedManyWithoutJob_profileInput } from '../job-profile-organization/job-profile-organization-create-nested-many-without-job-profile.input';
import { JobProfileContextCreateNestedOneWithoutJob_profileInput } from '../job-profile-context/job-profile-context-create-nested-one-without-job-profile.input';
import { JobProfileRoleTypeCreateNestedOneWithoutJob_profilesInput } from '../job-profile-role-type/job-profile-role-type-create-nested-one-without-job-profiles.input';
import { JobProfileScopeCreateNestedOneWithoutJob_profilesInput } from '../job-profile-scope/job-profile-scope-create-nested-one-without-job-profiles.input';
import { UserCreateNestedOneWithoutJobProfileInput } from '../user/user-create-nested-one-without-job-profile.input';
import { JobProfileJobFamilyLinkCreateNestedManyWithoutJobProfileInput } from '../job-profile-job-family-link/job-profile-job-family-link-create-nested-many-without-job-profile.input';
import { JobProfileStreamLinkCreateNestedManyWithoutJobProfileInput } from '../job-profile-stream-link/job-profile-stream-link-create-nested-many-without-job-profile.input';
import { JobProfileReportsToCreateNestedManyWithoutJob_profileInput } from '../job-profile-reports-to/job-profile-reports-to-create-nested-many-without-job-profile.input';
import { PositionRequestCreateNestedManyWithoutParent_job_profileInput } from '../position-request/position-request-create-nested-many-without-parent-job-profile.input';

@InputType()
export class JobProfileCreateWithoutRoleInput {
  @Field(() => Boolean, { nullable: true })
  all_organizations?: boolean;

  @Field(() => Boolean, { nullable: true })
  all_reports_to?: boolean;

  @Field(() => JobProfileState, { nullable: true })
  state?: keyof typeof JobProfileState;

  @Field(() => JobProfileType, { nullable: false })
  type!: keyof typeof JobProfileType;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => String, { nullable: true })
  program_overview?: string;

  @Field(() => Boolean, { nullable: true })
  review_required?: boolean;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: false })
  number!: number;

  @Field(() => String, { nullable: false })
  overview!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  accountabilities?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  education?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  job_experience?: any;

  @Field(() => [String], { nullable: true })
  professional_registration_requirements?: Array<string>;

  @Field(() => [String], { nullable: true })
  preferences?: Array<string>;

  @Field(() => [String], { nullable: true })
  knowledge_skills_abilities?: Array<string>;

  @Field(() => [String], { nullable: true })
  willingness_statements?: Array<string>;

  @Field(() => [String], { nullable: true })
  optional_requirements?: Array<string>;

  @Field(() => GraphQLJSON, { nullable: true })
  security_screenings?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  total_comp_create_form_misc?: any;

  @Field(() => JobProfileBehaviouralCompetencyCreateNestedManyWithoutJob_profileInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobProfileClassificationCreateNestedManyWithoutJob_profileInput, { nullable: true })
  classifications?: JobProfileClassificationCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobProfileOrganizationCreateNestedManyWithoutJob_profileInput, { nullable: true })
  organizations?: JobProfileOrganizationCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobProfileContextCreateNestedOneWithoutJob_profileInput, { nullable: true })
  context?: JobProfileContextCreateNestedOneWithoutJob_profileInput;

  @Field(() => JobProfileRoleTypeCreateNestedOneWithoutJob_profilesInput, { nullable: true })
  role_type?: JobProfileRoleTypeCreateNestedOneWithoutJob_profilesInput;

  @Field(() => JobProfileScopeCreateNestedOneWithoutJob_profilesInput, { nullable: true })
  scope?: JobProfileScopeCreateNestedOneWithoutJob_profilesInput;

  @Field(() => UserCreateNestedOneWithoutJobProfileInput, { nullable: true })
  owner?: UserCreateNestedOneWithoutJobProfileInput;

  @Field(() => JobProfileJobFamilyLinkCreateNestedManyWithoutJobProfileInput, { nullable: true })
  jobFamilies?: JobProfileJobFamilyLinkCreateNestedManyWithoutJobProfileInput;

  @Field(() => JobProfileStreamLinkCreateNestedManyWithoutJobProfileInput, { nullable: true })
  streams?: JobProfileStreamLinkCreateNestedManyWithoutJobProfileInput;

  @Field(() => JobProfileReportsToCreateNestedManyWithoutJob_profileInput, { nullable: true })
  reports_to?: JobProfileReportsToCreateNestedManyWithoutJob_profileInput;

  @Field(() => PositionRequestCreateNestedManyWithoutParent_job_profileInput, { nullable: true })
  position_request?: PositionRequestCreateNestedManyWithoutParent_job_profileInput;
}
