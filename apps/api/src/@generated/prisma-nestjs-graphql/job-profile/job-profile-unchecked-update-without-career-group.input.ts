import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobStream } from '../prisma/job-stream.enum';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-unchecked-update-many-without-job-profile-nested.input';
import { JobProfileReportsToUncheckedUpdateManyWithoutJob_profileNestedInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-update-many-without-job-profile-nested.input';
import { PositionRequestUncheckedUpdateManyWithoutParent_job_profileNestedInput } from '../position-request/position-request-unchecked-update-many-without-parent-job-profile-nested.input';
import { JobProfileUncheckedUpdateManyWithoutParentNestedInput } from './job-profile-unchecked-update-many-without-parent-nested.input';

@InputType()
export class JobProfileUncheckedUpdateWithoutCareer_groupInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  classification_id?: string;

  @Field(() => Int, { nullable: true })
  family_id?: number;

  @Field(() => String, { nullable: true })
  organization_id?: string;

  @Field(() => String, { nullable: true })
  owner_id?: string;

  @Field(() => Int, { nullable: true })
  parent_id?: number;

  @Field(() => Int, { nullable: true })
  role_id?: number;

  @Field(() => JobProfileState, { nullable: true })
  state?: keyof typeof JobProfileState;

  @Field(() => JobStream, { nullable: true })
  stream?: keyof typeof JobStream;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  number?: number;

  @Field(() => String, { nullable: true })
  context?: string;

  @Field(() => String, { nullable: true })
  overview?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  accountabilities?: any;

  @Field(() => [String], { nullable: true })
  requirements?: Array<string>;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileReportsToUncheckedUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  reports_to?: JobProfileReportsToUncheckedUpdateManyWithoutJob_profileNestedInput;

  @Field(() => PositionRequestUncheckedUpdateManyWithoutParent_job_profileNestedInput, { nullable: true })
  position_request?: PositionRequestUncheckedUpdateManyWithoutParent_job_profileNestedInput;

  @Field(() => JobProfileUncheckedUpdateManyWithoutParentNestedInput, { nullable: true })
  children?: JobProfileUncheckedUpdateManyWithoutParentNestedInput;
}
