import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobProfileType } from '../prisma/job-profile-type.enum';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-unchecked-update-many-without-job-profile-nested.input';
import { JobProfileClassificationUncheckedUpdateManyWithoutJob_profileNestedInput } from '../job-profile-classification/job-profile-classification-unchecked-update-many-without-job-profile-nested.input';
import { JobProfileOrganizationUncheckedUpdateManyWithoutJob_profileNestedInput } from '../job-profile-organization/job-profile-organization-unchecked-update-many-without-job-profile-nested.input';
import { JobProfileContextUncheckedUpdateOneWithoutJob_profileNestedInput } from '../job-profile-context/job-profile-context-unchecked-update-one-without-job-profile-nested.input';
import { JobProfileReportsToUncheckedUpdateManyWithoutJob_profileNestedInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-update-many-without-job-profile-nested.input';
import { PositionRequestUncheckedUpdateManyWithoutParent_job_profileNestedInput } from '../position-request/position-request-unchecked-update-many-without-parent-job-profile-nested.input';

@InputType()
export class JobProfileUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  career_group_id?: number;

  @Field(() => Int, { nullable: true })
  job_family_id?: number;

  @Field(() => Int, { nullable: true })
  role_id?: number;

  @Field(() => JobProfileState, { nullable: true })
  state?: keyof typeof JobProfileState;

  @Field(() => Int, { nullable: true })
  stream_id?: number;

  @Field(() => JobProfileType, { nullable: true })
  type?: keyof typeof JobProfileType;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => String, { nullable: true })
  owner_id?: string;

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

  @Field(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileClassificationUncheckedUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  classifications?: JobProfileClassificationUncheckedUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileOrganizationUncheckedUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  organizations?: JobProfileOrganizationUncheckedUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileContextUncheckedUpdateOneWithoutJob_profileNestedInput, { nullable: true })
  context?: JobProfileContextUncheckedUpdateOneWithoutJob_profileNestedInput;

  @Field(() => JobProfileReportsToUncheckedUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  reports_to?: JobProfileReportsToUncheckedUpdateManyWithoutJob_profileNestedInput;

  @Field(() => PositionRequestUncheckedUpdateManyWithoutParent_job_profileNestedInput, { nullable: true })
  position_request?: PositionRequestUncheckedUpdateManyWithoutParent_job_profileNestedInput;
}
