import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateManyJob_profileInputEnvelope } from './job-profile-classification-create-many-job-profile-input-envelope.input';
import { JobProfileClassificationCreateOrConnectWithoutJob_profileInput } from './job-profile-classification-create-or-connect-without-job-profile.input';
import { JobProfileClassificationCreateWithoutJob_profileInput } from './job-profile-classification-create-without-job-profile.input';
import { JobProfileClassificationScalarWhereInput } from './job-profile-classification-scalar-where.input';
import { JobProfileClassificationUpdateManyWithWhereWithoutJob_profileInput } from './job-profile-classification-update-many-with-where-without-job-profile.input';
import { JobProfileClassificationUpdateWithWhereUniqueWithoutJob_profileInput } from './job-profile-classification-update-with-where-unique-without-job-profile.input';
import { JobProfileClassificationUpsertWithWhereUniqueWithoutJob_profileInput } from './job-profile-classification-upsert-with-where-unique-without-job-profile.input';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';

@InputType()
export class JobProfileClassificationUncheckedUpdateManyWithoutJob_profileNestedInput {
  @Field(() => [JobProfileClassificationCreateWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileClassificationCreateWithoutJob_profileInput)
  create?: Array<JobProfileClassificationCreateWithoutJob_profileInput>;

  @Field(() => [JobProfileClassificationCreateOrConnectWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileClassificationCreateOrConnectWithoutJob_profileInput)
  connectOrCreate?: Array<JobProfileClassificationCreateOrConnectWithoutJob_profileInput>;

  @Field(() => [JobProfileClassificationUpsertWithWhereUniqueWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileClassificationUpsertWithWhereUniqueWithoutJob_profileInput)
  upsert?: Array<JobProfileClassificationUpsertWithWhereUniqueWithoutJob_profileInput>;

  @Field(() => JobProfileClassificationCreateManyJob_profileInputEnvelope, { nullable: true })
  @Type(() => JobProfileClassificationCreateManyJob_profileInputEnvelope)
  createMany?: JobProfileClassificationCreateManyJob_profileInputEnvelope;

  @Field(() => [JobProfileClassificationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  set?: Array<Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>>;

  @Field(() => [JobProfileClassificationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>>;

  @Field(() => [JobProfileClassificationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>>;

  @Field(() => [JobProfileClassificationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>>;

  @Field(() => [JobProfileClassificationUpdateWithWhereUniqueWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileClassificationUpdateWithWhereUniqueWithoutJob_profileInput)
  update?: Array<JobProfileClassificationUpdateWithWhereUniqueWithoutJob_profileInput>;

  @Field(() => [JobProfileClassificationUpdateManyWithWhereWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileClassificationUpdateManyWithWhereWithoutJob_profileInput)
  updateMany?: Array<JobProfileClassificationUpdateManyWithWhereWithoutJob_profileInput>;

  @Field(() => [JobProfileClassificationScalarWhereInput], { nullable: true })
  @Type(() => JobProfileClassificationScalarWhereInput)
  deleteMany?: Array<JobProfileClassificationScalarWhereInput>;
}
