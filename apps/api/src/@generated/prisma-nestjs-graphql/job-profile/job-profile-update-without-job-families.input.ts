import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobProfileType } from '../prisma/job-profile-type.enum';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyUpdateManyWithoutJob_profileNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-update-many-without-job-profile-nested.input';
import { JobProfileClassificationUpdateManyWithoutJob_profileNestedInput } from '../job-profile-classification/job-profile-classification-update-many-without-job-profile-nested.input';
import { JobProfileOrganizationUpdateManyWithoutJob_profileNestedInput } from '../job-profile-organization/job-profile-organization-update-many-without-job-profile-nested.input';
import { JobProfileContextUpdateOneWithoutJob_profileNestedInput } from '../job-profile-context/job-profile-context-update-one-without-job-profile-nested.input';
import { JobProfileRoleUpdateOneWithoutJob_profilesNestedInput } from '../job-profile-role/job-profile-role-update-one-without-job-profiles-nested.input';
import { JobProfileRoleTypeUpdateOneWithoutJob_profilesNestedInput } from '../job-profile-role-type/job-profile-role-type-update-one-without-job-profiles-nested.input';
import { JobProfileScopeUpdateOneWithoutJob_profilesNestedInput } from '../job-profile-scope/job-profile-scope-update-one-without-job-profiles-nested.input';
import { UserUpdateOneWithoutJobProfileNestedInput } from '../user/user-update-one-without-job-profile-nested.input';
import { JobProfileStreamLinkUpdateManyWithoutJobProfileNestedInput } from '../job-profile-stream-link/job-profile-stream-link-update-many-without-job-profile-nested.input';
import { JobProfileReportsToUpdateManyWithoutJob_profileNestedInput } from '../job-profile-reports-to/job-profile-reports-to-update-many-without-job-profile-nested.input';
import { PositionRequestUpdateManyWithoutParent_job_profileNestedInput } from '../position-request/position-request-update-many-without-parent-job-profile-nested.input';

@InputType()
export class JobProfileUpdateWithoutJobFamiliesInput {
  @Field(() => JobProfileState, { nullable: true })
  state?: keyof typeof JobProfileState;

  @Field(() => JobProfileType, { nullable: true })
  type?: keyof typeof JobProfileType;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

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
  requirements?: any;

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

  @Field(() => JobProfileBehaviouralCompetencyUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileClassificationUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  classifications?: JobProfileClassificationUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileOrganizationUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  organizations?: JobProfileOrganizationUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileContextUpdateOneWithoutJob_profileNestedInput, { nullable: true })
  context?: JobProfileContextUpdateOneWithoutJob_profileNestedInput;

  @Field(() => JobProfileRoleUpdateOneWithoutJob_profilesNestedInput, { nullable: true })
  role?: JobProfileRoleUpdateOneWithoutJob_profilesNestedInput;

  @Field(() => JobProfileRoleTypeUpdateOneWithoutJob_profilesNestedInput, { nullable: true })
  role_type?: JobProfileRoleTypeUpdateOneWithoutJob_profilesNestedInput;

  @Field(() => JobProfileScopeUpdateOneWithoutJob_profilesNestedInput, { nullable: true })
  scope?: JobProfileScopeUpdateOneWithoutJob_profilesNestedInput;

  @Field(() => UserUpdateOneWithoutJobProfileNestedInput, { nullable: true })
  owner?: UserUpdateOneWithoutJobProfileNestedInput;

  @Field(() => JobProfileStreamLinkUpdateManyWithoutJobProfileNestedInput, { nullable: true })
  streams?: JobProfileStreamLinkUpdateManyWithoutJobProfileNestedInput;

  @Field(() => JobProfileReportsToUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  reports_to?: JobProfileReportsToUpdateManyWithoutJob_profileNestedInput;

  @Field(() => PositionRequestUpdateManyWithoutParent_job_profileNestedInput, { nullable: true })
  position_request?: PositionRequestUpdateManyWithoutParent_job_profileNestedInput;
}
