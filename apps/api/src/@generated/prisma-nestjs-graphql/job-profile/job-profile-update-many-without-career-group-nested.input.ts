import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutCareer_groupInput } from './job-profile-create-without-career-group.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutCareer_groupInput } from './job-profile-create-or-connect-without-career-group.input';
import { JobProfileUpsertWithWhereUniqueWithoutCareer_groupInput } from './job-profile-upsert-with-where-unique-without-career-group.input';
import { JobProfileCreateManyCareer_groupInputEnvelope } from './job-profile-create-many-career-group-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateWithWhereUniqueWithoutCareer_groupInput } from './job-profile-update-with-where-unique-without-career-group.input';
import { JobProfileUpdateManyWithWhereWithoutCareer_groupInput } from './job-profile-update-many-with-where-without-career-group.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';

@InputType()
export class JobProfileUpdateManyWithoutCareer_groupNestedInput {
  @Field(() => [JobProfileCreateWithoutCareer_groupInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutCareer_groupInput)
  create?: Array<JobProfileCreateWithoutCareer_groupInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutCareer_groupInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutCareer_groupInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutCareer_groupInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutCareer_groupInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutCareer_groupInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutCareer_groupInput>;

  @Field(() => JobProfileCreateManyCareer_groupInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyCareer_groupInputEnvelope)
  createMany?: JobProfileCreateManyCareer_groupInputEnvelope;

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

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutCareer_groupInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutCareer_groupInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutCareer_groupInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutCareer_groupInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutCareer_groupInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutCareer_groupInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
