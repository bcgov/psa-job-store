import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyCreateWithoutBehavioral_competencyInput } from './job-profile-behavioural-competency-create-without-behavioral-competency.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioral_competencyInput } from './job-profile-behavioural-competency-create-or-connect-without-behavioral-competency.input';
import { JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutBehavioral_competencyInput } from './job-profile-behavioural-competency-upsert-with-where-unique-without-behavioral-competency.input';
import { JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInputEnvelope } from './job-profile-behavioural-competency-create-many-behavioral-competency-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';
import { JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutBehavioral_competencyInput } from './job-profile-behavioural-competency-update-with-where-unique-without-behavioral-competency.input';
import { JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutBehavioral_competencyInput } from './job-profile-behavioural-competency-update-many-with-where-without-behavioral-competency.input';
import { JobProfileBehaviouralCompetencyScalarWhereInput } from './job-profile-behavioural-competency-scalar-where.input';

@InputType()
export class JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioral_competencyNestedInput {
  @Field(() => [JobProfileBehaviouralCompetencyCreateWithoutBehavioral_competencyInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateWithoutBehavioral_competencyInput)
  create?: Array<JobProfileBehaviouralCompetencyCreateWithoutBehavioral_competencyInput>;

  @Field(() => [JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioral_competencyInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioral_competencyInput)
  connectOrCreate?: Array<JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioral_competencyInput>;

  @Field(() => [JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutBehavioral_competencyInput], {
    nullable: true,
  })
  @Type(() => JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutBehavioral_competencyInput)
  upsert?: Array<JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutBehavioral_competencyInput>;

  @Field(() => JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInputEnvelope, { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInputEnvelope)
  createMany?: JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInputEnvelope;

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

  @Field(() => [JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutBehavioral_competencyInput], {
    nullable: true,
  })
  @Type(() => JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutBehavioral_competencyInput)
  update?: Array<JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutBehavioral_competencyInput>;

  @Field(() => [JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutBehavioral_competencyInput], {
    nullable: true,
  })
  @Type(() => JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutBehavioral_competencyInput)
  updateMany?: Array<JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutBehavioral_competencyInput>;

  @Field(() => [JobProfileBehaviouralCompetencyScalarWhereInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyScalarWhereInput)
  deleteMany?: Array<JobProfileBehaviouralCompetencyScalarWhereInput>;
}
