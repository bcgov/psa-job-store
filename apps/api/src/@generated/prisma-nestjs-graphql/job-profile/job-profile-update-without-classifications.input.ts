import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobProfileType } from '../prisma/job-profile-type.enum';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyUpdateManyWithoutJob_profileNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-update-many-without-job-profile-nested.input';
import { JobProfileOrganizationUpdateManyWithoutJob_profileNestedInput } from '../job-profile-organization/job-profile-organization-update-many-without-job-profile-nested.input';
import { JobProfileCareerGroupUpdateOneWithoutJob_profilesNestedInput } from '../job-profile-career-group/job-profile-career-group-update-one-without-job-profiles-nested.input';
import { JobProfileContextUpdateOneWithoutJob_profileNestedInput } from '../job-profile-context/job-profile-context-update-one-without-job-profile-nested.input';
import { JobProfileJobFamilyUpdateOneWithoutJob_profilesNestedInput } from '../job-profile-job-family/job-profile-job-family-update-one-without-job-profiles-nested.input';
import { JobProfileRoleUpdateOneWithoutJob_profilesNestedInput } from '../job-profile-role/job-profile-role-update-one-without-job-profiles-nested.input';
import { JobProfileRoleTypeUpdateOneWithoutJob_profilesNestedInput } from '../job-profile-role-type/job-profile-role-type-update-one-without-job-profiles-nested.input';
import { JobProfileScopeUpdateOneWithoutJob_profilesNestedInput } from '../job-profile-scope/job-profile-scope-update-one-without-job-profiles-nested.input';
import { JobProfileStreamUpdateOneWithoutJob_profilesNestedInput } from '../job-profile-stream/job-profile-stream-update-one-without-job-profiles-nested.input';
import { UserUpdateOneWithoutJobProfileNestedInput } from '../user/user-update-one-without-job-profile-nested.input';
import { JobProfileReportsToUpdateManyWithoutJob_profileNestedInput } from '../job-profile-reports-to/job-profile-reports-to-update-many-without-job-profile-nested.input';
import { PositionRequestUpdateManyWithoutParent_job_profileNestedInput } from '../position-request/position-request-update-many-without-parent-job-profile-nested.input';

@InputType()
export class JobProfileUpdateWithoutClassificationsInput {
  @Field(() => JobProfileState, { nullable: true })
  state?: keyof typeof JobProfileState;

  @Field(() => JobProfileType, { nullable: true })
  type?: keyof typeof JobProfileType;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  number?: number;

  @Field(() => String, { nullable: true })
  overview?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  accountabilities?: any;

  @Field(() => [String], { nullable: true })
  requirements?: Array<string>;

  @Field(() => JobProfileBehaviouralCompetencyUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileOrganizationUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  organizations?: JobProfileOrganizationUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileCareerGroupUpdateOneWithoutJob_profilesNestedInput, { nullable: true })
  career_group?: JobProfileCareerGroupUpdateOneWithoutJob_profilesNestedInput;

  @Field(() => JobProfileContextUpdateOneWithoutJob_profileNestedInput, { nullable: true })
  context?: JobProfileContextUpdateOneWithoutJob_profileNestedInput;

  @Field(() => JobProfileJobFamilyUpdateOneWithoutJob_profilesNestedInput, { nullable: true })
  job_family?: JobProfileJobFamilyUpdateOneWithoutJob_profilesNestedInput;

  @Field(() => JobProfileRoleUpdateOneWithoutJob_profilesNestedInput, { nullable: true })
  role?: JobProfileRoleUpdateOneWithoutJob_profilesNestedInput;

  @Field(() => JobProfileRoleTypeUpdateOneWithoutJob_profilesNestedInput, { nullable: true })
  role_type?: JobProfileRoleTypeUpdateOneWithoutJob_profilesNestedInput;

  @Field(() => JobProfileScopeUpdateOneWithoutJob_profilesNestedInput, { nullable: true })
  scope?: JobProfileScopeUpdateOneWithoutJob_profilesNestedInput;

  @Field(() => JobProfileStreamUpdateOneWithoutJob_profilesNestedInput, { nullable: true })
  stream?: JobProfileStreamUpdateOneWithoutJob_profilesNestedInput;

  @Field(() => UserUpdateOneWithoutJobProfileNestedInput, { nullable: true })
  owner?: UserUpdateOneWithoutJobProfileNestedInput;

  @Field(() => JobProfileReportsToUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  reports_to?: JobProfileReportsToUpdateManyWithoutJob_profileNestedInput;

  @Field(() => PositionRequestUpdateManyWithoutParent_job_profileNestedInput, { nullable: true })
  position_request?: PositionRequestUpdateManyWithoutParent_job_profileNestedInput;
}
