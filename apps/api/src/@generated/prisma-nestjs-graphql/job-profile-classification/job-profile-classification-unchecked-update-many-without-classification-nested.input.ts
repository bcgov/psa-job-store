import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateManyClassificationInputEnvelope } from './job-profile-classification-create-many-classification-input-envelope.input';
import { JobProfileClassificationCreateOrConnectWithoutClassificationInput } from './job-profile-classification-create-or-connect-without-classification.input';
import { JobProfileClassificationCreateWithoutClassificationInput } from './job-profile-classification-create-without-classification.input';
import { JobProfileClassificationScalarWhereInput } from './job-profile-classification-scalar-where.input';
import { JobProfileClassificationUpdateManyWithWhereWithoutClassificationInput } from './job-profile-classification-update-many-with-where-without-classification.input';
import { JobProfileClassificationUpdateWithWhereUniqueWithoutClassificationInput } from './job-profile-classification-update-with-where-unique-without-classification.input';
import { JobProfileClassificationUpsertWithWhereUniqueWithoutClassificationInput } from './job-profile-classification-upsert-with-where-unique-without-classification.input';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';

@InputType()
export class JobProfileClassificationUncheckedUpdateManyWithoutClassificationNestedInput {
  @Field(() => [JobProfileClassificationCreateWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileClassificationCreateWithoutClassificationInput)
  create?: Array<JobProfileClassificationCreateWithoutClassificationInput>;

  @Field(() => [JobProfileClassificationCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileClassificationCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<JobProfileClassificationCreateOrConnectWithoutClassificationInput>;

  @Field(() => [JobProfileClassificationUpsertWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileClassificationUpsertWithWhereUniqueWithoutClassificationInput)
  upsert?: Array<JobProfileClassificationUpsertWithWhereUniqueWithoutClassificationInput>;

  @Field(() => JobProfileClassificationCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => JobProfileClassificationCreateManyClassificationInputEnvelope)
  createMany?: JobProfileClassificationCreateManyClassificationInputEnvelope;

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

  @Field(() => [JobProfileClassificationUpdateWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileClassificationUpdateWithWhereUniqueWithoutClassificationInput)
  update?: Array<JobProfileClassificationUpdateWithWhereUniqueWithoutClassificationInput>;

  @Field(() => [JobProfileClassificationUpdateManyWithWhereWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileClassificationUpdateManyWithWhereWithoutClassificationInput)
  updateMany?: Array<JobProfileClassificationUpdateManyWithWhereWithoutClassificationInput>;

  @Field(() => [JobProfileClassificationScalarWhereInput], { nullable: true })
  @Type(() => JobProfileClassificationScalarWhereInput)
  deleteMany?: Array<JobProfileClassificationScalarWhereInput>;
}
