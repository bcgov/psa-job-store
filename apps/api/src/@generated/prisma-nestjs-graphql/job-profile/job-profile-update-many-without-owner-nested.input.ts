import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutOwnerInput } from './job-profile-create-without-owner.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutOwnerInput } from './job-profile-create-or-connect-without-owner.input';
import { JobProfileUpsertWithWhereUniqueWithoutOwnerInput } from './job-profile-upsert-with-where-unique-without-owner.input';
import { JobProfileCreateManyOwnerInputEnvelope } from './job-profile-create-many-owner-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateWithWhereUniqueWithoutOwnerInput } from './job-profile-update-with-where-unique-without-owner.input';
import { JobProfileUpdateManyWithWhereWithoutOwnerInput } from './job-profile-update-many-with-where-without-owner.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';

@InputType()
export class JobProfileUpdateManyWithoutOwnerNestedInput {
  @Field(() => [JobProfileCreateWithoutOwnerInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutOwnerInput)
  create?: Array<JobProfileCreateWithoutOwnerInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutOwnerInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutOwnerInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutOwnerInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutOwnerInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutOwnerInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutOwnerInput>;

  @Field(() => JobProfileCreateManyOwnerInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyOwnerInputEnvelope)
  createMany?: JobProfileCreateManyOwnerInputEnvelope;

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

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutOwnerInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutOwnerInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutOwnerInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutOwnerInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutOwnerInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutOwnerInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
