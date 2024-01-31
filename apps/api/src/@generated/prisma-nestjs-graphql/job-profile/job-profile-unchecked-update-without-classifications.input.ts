import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobProfileType } from '../prisma/job-profile-type.enum';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-unchecked-update-many-without-job-profile-nested.input';
import { JobProfileOrganizationUncheckedUpdateManyWithoutJob_profileNestedInput } from '../job-profile-organization/job-profile-organization-unchecked-update-many-without-job-profile-nested.input';
import { JobProfileContextUncheckedUpdateOneWithoutJob_profileNestedInput } from '../job-profile-context/job-profile-context-unchecked-update-one-without-job-profile-nested.input';
import { JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobProfileNestedInput } from '../job-profile-job-family-link/job-profile-job-family-link-unchecked-update-many-without-job-profile-nested.input';
import { JobProfileStreamLinkUncheckedUpdateManyWithoutJobProfileNestedInput } from '../job-profile-stream-link/job-profile-stream-link-unchecked-update-many-without-job-profile-nested.input';
import { JobProfileReportsToUncheckedUpdateManyWithoutJob_profileNestedInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-update-many-without-job-profile-nested.input';
import { PositionRequestUncheckedUpdateManyWithoutParent_job_profileNestedInput } from '../position-request/position-request-unchecked-update-many-without-parent-job-profile-nested.input';

@InputType()
export class JobProfileUncheckedUpdateWithoutClassificationsInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Boolean, { nullable: true })
  all_organizations?: boolean;

  @Field(() => Boolean, { nullable: true })
  all_reports_to?: boolean;

  @Field(() => Int, { nullable: true })
  role_id?: number;

  @Field(() => Int, { nullable: true })
  role_type_id?: number;

  @Field(() => Int, { nullable: true })
  scope_id?: number;

  @Field(() => JobProfileState, { nullable: true })
  state?: keyof typeof JobProfileState;

  @Field(() => JobProfileType, { nullable: true })
  type?: keyof typeof JobProfileType;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => String, { nullable: true })
  owner_id?: string;

  @Field(() => String, { nullable: true })
  program_overview?: string;

  @Field(() => Boolean, { nullable: true })
  review_required?: boolean;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  number?: number;

  @Field(() => String, { nullable: true })
  overview?: string;

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

  @Field(() => GraphQLJSON, { nullable: true })
  security_screenings?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  total_comp_create_form_misc?: any;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileOrganizationUncheckedUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  organizations?: JobProfileOrganizationUncheckedUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileContextUncheckedUpdateOneWithoutJob_profileNestedInput, { nullable: true })
  context?: JobProfileContextUncheckedUpdateOneWithoutJob_profileNestedInput;

  @Field(() => JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobProfileNestedInput, { nullable: true })
  jobFamilies?: JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobProfileNestedInput;

  @Field(() => JobProfileStreamLinkUncheckedUpdateManyWithoutJobProfileNestedInput, { nullable: true })
  streams?: JobProfileStreamLinkUncheckedUpdateManyWithoutJobProfileNestedInput;

  @Field(() => JobProfileReportsToUncheckedUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  reports_to?: JobProfileReportsToUncheckedUpdateManyWithoutJob_profileNestedInput;

  @Field(() => PositionRequestUncheckedUpdateManyWithoutParent_job_profileNestedInput, { nullable: true })
  position_request?: PositionRequestUncheckedUpdateManyWithoutParent_job_profileNestedInput;
}
