import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutClassificationInput } from './job-profile-create-without-classification.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutClassificationInput } from './job-profile-create-or-connect-without-classification.input';
import { JobProfileUpsertWithWhereUniqueWithoutClassificationInput } from './job-profile-upsert-with-where-unique-without-classification.input';
import { JobProfileCreateManyClassificationInputEnvelope } from './job-profile-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateWithWhereUniqueWithoutClassificationInput } from './job-profile-update-with-where-unique-without-classification.input';
import { JobProfileUpdateManyWithWhereWithoutClassificationInput } from './job-profile-update-many-with-where-without-classification.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';

@InputType()
export class JobProfileUncheckedUpdateManyWithoutClassificationNestedInput {
  @Field(() => [JobProfileCreateWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutClassificationInput)
  create?: Array<JobProfileCreateWithoutClassificationInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutClassificationInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutClassificationInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutClassificationInput>;

  @Field(() => JobProfileCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyClassificationInputEnvelope)
  createMany?: JobProfileCreateManyClassificationInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  set?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutClassificationInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutClassificationInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutClassificationInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutClassificationInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
