import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutMinistryInput } from './job-profile-create-without-ministry.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutMinistryInput } from './job-profile-create-or-connect-without-ministry.input';
import { JobProfileUpsertWithWhereUniqueWithoutMinistryInput } from './job-profile-upsert-with-where-unique-without-ministry.input';
import { JobProfileCreateManyMinistryInputEnvelope } from './job-profile-create-many-ministry-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateWithWhereUniqueWithoutMinistryInput } from './job-profile-update-with-where-unique-without-ministry.input';
import { JobProfileUpdateManyWithWhereWithoutMinistryInput } from './job-profile-update-many-with-where-without-ministry.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';

@InputType()
export class JobProfileUpdateManyWithoutMinistryNestedInput {
  @Field(() => [JobProfileCreateWithoutMinistryInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutMinistryInput)
  create?: Array<JobProfileCreateWithoutMinistryInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutMinistryInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutMinistryInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutMinistryInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutMinistryInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutMinistryInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutMinistryInput>;

  @Field(() => JobProfileCreateManyMinistryInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyMinistryInputEnvelope)
  createMany?: JobProfileCreateManyMinistryInputEnvelope;

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

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutMinistryInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutMinistryInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutMinistryInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutMinistryInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutMinistryInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutMinistryInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
