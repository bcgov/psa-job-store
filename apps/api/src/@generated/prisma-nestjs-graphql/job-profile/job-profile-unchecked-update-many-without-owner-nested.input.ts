import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateManyOwnerInputEnvelope } from './job-profile-create-many-owner-input-envelope.input';
import { JobProfileCreateOrConnectWithoutOwnerInput } from './job-profile-create-or-connect-without-owner.input';
import { JobProfileCreateWithoutOwnerInput } from './job-profile-create-without-owner.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';
import { JobProfileUpdateManyWithWhereWithoutOwnerInput } from './job-profile-update-many-with-where-without-owner.input';
import { JobProfileUpdateWithWhereUniqueWithoutOwnerInput } from './job-profile-update-with-where-unique-without-owner.input';
import { JobProfileUpsertWithWhereUniqueWithoutOwnerInput } from './job-profile-upsert-with-where-unique-without-owner.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUncheckedUpdateManyWithoutOwnerNestedInput {
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
  set?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>>;

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
