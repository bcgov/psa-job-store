import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutJob_familyInput } from './job-profile-create-without-job-family.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutJob_familyInput } from './job-profile-create-or-connect-without-job-family.input';
import { JobProfileUpsertWithWhereUniqueWithoutJob_familyInput } from './job-profile-upsert-with-where-unique-without-job-family.input';
import { JobProfileCreateManyJob_familyInputEnvelope } from './job-profile-create-many-job-family-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateWithWhereUniqueWithoutJob_familyInput } from './job-profile-update-with-where-unique-without-job-family.input';
import { JobProfileUpdateManyWithWhereWithoutJob_familyInput } from './job-profile-update-many-with-where-without-job-family.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';

@InputType()
export class JobProfileUpdateManyWithoutJob_familyNestedInput {
  @Field(() => [JobProfileCreateWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutJob_familyInput)
  create?: Array<JobProfileCreateWithoutJob_familyInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutJob_familyInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutJob_familyInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutJob_familyInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutJob_familyInput>;

  @Field(() => JobProfileCreateManyJob_familyInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyJob_familyInputEnvelope)
  createMany?: JobProfileCreateManyJob_familyInputEnvelope;

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

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutJob_familyInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutJob_familyInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutJob_familyInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutJob_familyInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
