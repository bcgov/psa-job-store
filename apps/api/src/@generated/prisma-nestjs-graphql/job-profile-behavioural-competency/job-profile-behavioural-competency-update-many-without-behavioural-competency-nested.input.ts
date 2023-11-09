import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput } from './job-profile-behavioural-competency-create-without-behavioural-competency.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioural_competencyInput } from './job-profile-behavioural-competency-create-or-connect-without-behavioural-competency.input';
import { JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutBehavioural_competencyInput } from './job-profile-behavioural-competency-upsert-with-where-unique-without-behavioural-competency.input';
import { JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInputEnvelope } from './job-profile-behavioural-competency-create-many-behavioural-competency-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';
import { JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutBehavioural_competencyInput } from './job-profile-behavioural-competency-update-with-where-unique-without-behavioural-competency.input';
import { JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutBehavioural_competencyInput } from './job-profile-behavioural-competency-update-many-with-where-without-behavioural-competency.input';
import { JobProfileBehaviouralCompetencyScalarWhereInput } from './job-profile-behavioural-competency-scalar-where.input';

@InputType()
export class JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioural_competencyNestedInput {
  @Field(() => [JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput)
  create?: Array<JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput>;

  @Field(() => [JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioural_competencyInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioural_competencyInput)
  connectOrCreate?: Array<JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioural_competencyInput>;

  @Field(() => [JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutBehavioural_competencyInput], {
    nullable: true,
  })
  @Type(() => JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutBehavioural_competencyInput)
  upsert?: Array<JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutBehavioural_competencyInput>;

  @Field(() => JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInputEnvelope, { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInputEnvelope)
  createMany?: JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInputEnvelope;

  @Field(() => [JobProfileBehaviouralCompetencyWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  set?: Array<
    Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>
  >;

  @Field(() => [JobProfileBehaviouralCompetencyWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  disconnect?: Array<
    Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>
  >;

  @Field(() => [JobProfileBehaviouralCompetencyWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  delete?: Array<
    Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>
  >;

  @Field(() => [JobProfileBehaviouralCompetencyWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  connect?: Array<
    Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>
  >;

  @Field(() => [JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutBehavioural_competencyInput], {
    nullable: true,
  })
  @Type(() => JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutBehavioural_competencyInput)
  update?: Array<JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutBehavioural_competencyInput>;

  @Field(() => [JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutBehavioural_competencyInput], {
    nullable: true,
  })
  @Type(() => JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutBehavioural_competencyInput)
  updateMany?: Array<JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutBehavioural_competencyInput>;

  @Field(() => [JobProfileBehaviouralCompetencyScalarWhereInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyScalarWhereInput)
  deleteMany?: Array<JobProfileBehaviouralCompetencyScalarWhereInput>;
}
