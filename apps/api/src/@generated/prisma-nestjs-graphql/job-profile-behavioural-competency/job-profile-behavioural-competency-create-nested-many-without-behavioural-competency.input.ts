import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput } from './job-profile-behavioural-competency-create-without-behavioural-competency.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioural_competencyInput } from './job-profile-behavioural-competency-create-or-connect-without-behavioural-competency.input';
import { JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInputEnvelope } from './job-profile-behavioural-competency-create-many-behavioural-competency-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';

@InputType()
export class JobProfileBehaviouralCompetencyCreateNestedManyWithoutBehavioural_competencyInput {
  @Field(() => [JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput)
  create?: Array<JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput>;

  @Field(() => [JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioural_competencyInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioural_competencyInput)
  connectOrCreate?: Array<JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioural_competencyInput>;

  @Field(() => JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInputEnvelope, { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInputEnvelope)
  createMany?: JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInputEnvelope;

  @Field(() => [JobProfileBehaviouralCompetencyWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  connect?: Array<
    Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>
  >;
}
