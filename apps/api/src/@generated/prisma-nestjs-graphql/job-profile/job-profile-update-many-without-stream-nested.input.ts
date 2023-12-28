import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutStreamInput } from './job-profile-create-without-stream.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutStreamInput } from './job-profile-create-or-connect-without-stream.input';
import { JobProfileUpsertWithWhereUniqueWithoutStreamInput } from './job-profile-upsert-with-where-unique-without-stream.input';
import { JobProfileCreateManyStreamInputEnvelope } from './job-profile-create-many-stream-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateWithWhereUniqueWithoutStreamInput } from './job-profile-update-with-where-unique-without-stream.input';
import { JobProfileUpdateManyWithWhereWithoutStreamInput } from './job-profile-update-many-with-where-without-stream.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';

@InputType()
export class JobProfileUpdateManyWithoutStreamNestedInput {
  @Field(() => [JobProfileCreateWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutStreamInput)
  create?: Array<JobProfileCreateWithoutStreamInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutStreamInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutStreamInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutStreamInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutStreamInput>;

  @Field(() => JobProfileCreateManyStreamInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyStreamInputEnvelope)
  createMany?: JobProfileCreateManyStreamInputEnvelope;

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

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutStreamInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutStreamInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutStreamInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutStreamInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
