import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobProfileType } from '../prisma/job-profile-type.enum';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutJob_profileInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-unchecked-create-nested-many-without-job-profile.input';
import { JobProfileClassificationUncheckedCreateNestedManyWithoutJob_profileInput } from '../job-profile-classification/job-profile-classification-unchecked-create-nested-many-without-job-profile.input';
import { JobProfileOrganizationUncheckedCreateNestedManyWithoutJob_profileInput } from '../job-profile-organization/job-profile-organization-unchecked-create-nested-many-without-job-profile.input';
import { JobProfileContextUncheckedCreateNestedOneWithoutJob_profileInput } from '../job-profile-context/job-profile-context-unchecked-create-nested-one-without-job-profile.input';
import { JobProfileReportsToUncheckedCreateNestedManyWithoutJob_profileInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-create-nested-many-without-job-profile.input';
import { PositionRequestUncheckedCreateNestedManyWithoutParent_job_profileInput } from '../position-request/position-request-unchecked-create-nested-many-without-parent-job-profile.input';

@InputType()
export class JobProfileUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  career_group_id!: number;

  @Field(() => Int, { nullable: false })
  job_family_id!: number;

  @Field(() => Int, { nullable: false })
  role_id!: number;

  @Field(() => JobProfileState, { nullable: true })
  state?: keyof typeof JobProfileState;

  @Field(() => Int, { nullable: false })
  stream_id!: number;

  @Field(() => JobProfileType, { nullable: false })
  type!: keyof typeof JobProfileType;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => String, { nullable: true })
  owner_id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: false })
  number!: number;

  @Field(() => String, { nullable: false })
  overview!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  accountabilities?: any;

  @Field(() => [String], { nullable: true })
  requirements?: Array<string>;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutJob_profileInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobProfileClassificationUncheckedCreateNestedManyWithoutJob_profileInput, { nullable: true })
  classifications?: JobProfileClassificationUncheckedCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobProfileOrganizationUncheckedCreateNestedManyWithoutJob_profileInput, { nullable: true })
  organizations?: JobProfileOrganizationUncheckedCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobProfileContextUncheckedCreateNestedOneWithoutJob_profileInput, { nullable: true })
  context?: JobProfileContextUncheckedCreateNestedOneWithoutJob_profileInput;

  @Field(() => JobProfileReportsToUncheckedCreateNestedManyWithoutJob_profileInput, { nullable: true })
  reports_to?: JobProfileReportsToUncheckedCreateNestedManyWithoutJob_profileInput;

  @Field(() => PositionRequestUncheckedCreateNestedManyWithoutParent_job_profileInput, { nullable: true })
  position_request?: PositionRequestUncheckedCreateNestedManyWithoutParent_job_profileInput;
}
