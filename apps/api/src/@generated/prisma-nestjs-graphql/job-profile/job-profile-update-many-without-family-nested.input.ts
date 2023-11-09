import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutFamilyInput } from './job-profile-create-without-family.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutFamilyInput } from './job-profile-create-or-connect-without-family.input';
import { JobProfileUpsertWithWhereUniqueWithoutFamilyInput } from './job-profile-upsert-with-where-unique-without-family.input';
import { JobProfileCreateManyFamilyInputEnvelope } from './job-profile-create-many-family-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateWithWhereUniqueWithoutFamilyInput } from './job-profile-update-with-where-unique-without-family.input';
import { JobProfileUpdateManyWithWhereWithoutFamilyInput } from './job-profile-update-many-with-where-without-family.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';

@InputType()
export class JobProfileUpdateManyWithoutFamilyNestedInput {
  @Field(() => [JobProfileCreateWithoutFamilyInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutFamilyInput)
  create?: Array<JobProfileCreateWithoutFamilyInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutFamilyInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutFamilyInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutFamilyInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutFamilyInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutFamilyInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutFamilyInput>;

  @Field(() => JobProfileCreateManyFamilyInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyFamilyInputEnvelope)
  createMany?: JobProfileCreateManyFamilyInputEnvelope;

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

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutFamilyInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutFamilyInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutFamilyInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutFamilyInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutFamilyInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutFamilyInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
