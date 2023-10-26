import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyCreateWithoutBehavioral_competencyInput } from './job-profile-behavioural-competency-create-without-behavioral-competency.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioral_competencyInput } from './job-profile-behavioural-competency-create-or-connect-without-behavioral-competency.input';
import { JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInputEnvelope } from './job-profile-behavioural-competency-create-many-behavioral-competency-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';

@InputType()
export class JobProfileBehaviouralCompetencyCreateNestedManyWithoutBehavioral_competencyInput {
  @Field(() => [JobProfileBehaviouralCompetencyCreateWithoutBehavioral_competencyInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateWithoutBehavioral_competencyInput)
  create?: Array<JobProfileBehaviouralCompetencyCreateWithoutBehavioral_competencyInput>;

  @Field(() => [JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioral_competencyInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioral_competencyInput)
  connectOrCreate?: Array<JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioral_competencyInput>;

  @Field(() => JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInputEnvelope, { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInputEnvelope)
  createMany?: JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInputEnvelope;

  @Field(() => [JobProfileBehaviouralCompetencyWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  connect?: Array<
    Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>
  >;
}
