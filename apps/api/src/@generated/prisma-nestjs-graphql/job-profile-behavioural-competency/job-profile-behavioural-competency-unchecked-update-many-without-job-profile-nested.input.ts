import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput } from './job-profile-behavioural-competency-create-without-job-profile.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateOrConnectWithoutJob_profileInput } from './job-profile-behavioural-competency-create-or-connect-without-job-profile.input';
import { JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutJob_profileInput } from './job-profile-behavioural-competency-upsert-with-where-unique-without-job-profile.input';
import { JobProfileBehaviouralCompetencyCreateManyJob_profileInputEnvelope } from './job-profile-behavioural-competency-create-many-job-profile-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';
import { JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutJob_profileInput } from './job-profile-behavioural-competency-update-with-where-unique-without-job-profile.input';
import { JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutJob_profileInput } from './job-profile-behavioural-competency-update-many-with-where-without-job-profile.input';
import { JobProfileBehaviouralCompetencyScalarWhereInput } from './job-profile-behavioural-competency-scalar-where.input';

@InputType()
export class JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileNestedInput {
  @Field(() => [JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput)
  create?: Array<JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput>;

  @Field(() => [JobProfileBehaviouralCompetencyCreateOrConnectWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateOrConnectWithoutJob_profileInput)
  connectOrCreate?: Array<JobProfileBehaviouralCompetencyCreateOrConnectWithoutJob_profileInput>;

  @Field(() => [JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutJob_profileInput)
  upsert?: Array<JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutJob_profileInput>;

  @Field(() => JobProfileBehaviouralCompetencyCreateManyJob_profileInputEnvelope, { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateManyJob_profileInputEnvelope)
  createMany?: JobProfileBehaviouralCompetencyCreateManyJob_profileInputEnvelope;

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

  @Field(() => [JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutJob_profileInput)
  update?: Array<JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutJob_profileInput>;

  @Field(() => [JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutJob_profileInput)
  updateMany?: Array<JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutJob_profileInput>;

  @Field(() => [JobProfileBehaviouralCompetencyScalarWhereInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyScalarWhereInput)
  deleteMany?: Array<JobProfileBehaviouralCompetencyScalarWhereInput>;
}
