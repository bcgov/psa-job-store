import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamCreateWithoutJob_familyInput } from './job-profile-stream-create-without-job-family.input';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateOrConnectWithoutJob_familyInput } from './job-profile-stream-create-or-connect-without-job-family.input';
import { JobProfileStreamUpsertWithWhereUniqueWithoutJob_familyInput } from './job-profile-stream-upsert-with-where-unique-without-job-family.input';
import { JobProfileStreamCreateManyJob_familyInputEnvelope } from './job-profile-stream-create-many-job-family-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';
import { JobProfileStreamUpdateWithWhereUniqueWithoutJob_familyInput } from './job-profile-stream-update-with-where-unique-without-job-family.input';
import { JobProfileStreamUpdateManyWithWhereWithoutJob_familyInput } from './job-profile-stream-update-many-with-where-without-job-family.input';
import { JobProfileStreamScalarWhereInput } from './job-profile-stream-scalar-where.input';

@InputType()
export class JobProfileStreamUncheckedUpdateManyWithoutJob_familyNestedInput {
  @Field(() => [JobProfileStreamCreateWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileStreamCreateWithoutJob_familyInput)
  create?: Array<JobProfileStreamCreateWithoutJob_familyInput>;

  @Field(() => [JobProfileStreamCreateOrConnectWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileStreamCreateOrConnectWithoutJob_familyInput)
  connectOrCreate?: Array<JobProfileStreamCreateOrConnectWithoutJob_familyInput>;

  @Field(() => [JobProfileStreamUpsertWithWhereUniqueWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileStreamUpsertWithWhereUniqueWithoutJob_familyInput)
  upsert?: Array<JobProfileStreamUpsertWithWhereUniqueWithoutJob_familyInput>;

  @Field(() => JobProfileStreamCreateManyJob_familyInputEnvelope, { nullable: true })
  @Type(() => JobProfileStreamCreateManyJob_familyInputEnvelope)
  createMany?: JobProfileStreamCreateManyJob_familyInputEnvelope;

  @Field(() => [JobProfileStreamWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileStreamWhereUniqueInput)
  set?: Array<Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileStreamWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileStreamWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileStreamWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileStreamWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileStreamWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileStreamWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileStreamUpdateWithWhereUniqueWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileStreamUpdateWithWhereUniqueWithoutJob_familyInput)
  update?: Array<JobProfileStreamUpdateWithWhereUniqueWithoutJob_familyInput>;

  @Field(() => [JobProfileStreamUpdateManyWithWhereWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileStreamUpdateManyWithWhereWithoutJob_familyInput)
  updateMany?: Array<JobProfileStreamUpdateManyWithWhereWithoutJob_familyInput>;

  @Field(() => [JobProfileStreamScalarWhereInput], { nullable: true })
  @Type(() => JobProfileStreamScalarWhereInput)
  deleteMany?: Array<JobProfileStreamScalarWhereInput>;
}
