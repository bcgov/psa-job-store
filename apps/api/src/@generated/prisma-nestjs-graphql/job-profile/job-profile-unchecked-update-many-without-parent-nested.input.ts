import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutParentInput } from './job-profile-create-without-parent.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutParentInput } from './job-profile-create-or-connect-without-parent.input';
import { JobProfileUpsertWithWhereUniqueWithoutParentInput } from './job-profile-upsert-with-where-unique-without-parent.input';
import { JobProfileCreateManyParentInputEnvelope } from './job-profile-create-many-parent-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateWithWhereUniqueWithoutParentInput } from './job-profile-update-with-where-unique-without-parent.input';
import { JobProfileUpdateManyWithWhereWithoutParentInput } from './job-profile-update-many-with-where-without-parent.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';

@InputType()
export class JobProfileUncheckedUpdateManyWithoutParentNestedInput {
  @Field(() => [JobProfileCreateWithoutParentInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutParentInput)
  create?: Array<JobProfileCreateWithoutParentInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutParentInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutParentInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutParentInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutParentInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutParentInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutParentInput>;

  @Field(() => JobProfileCreateManyParentInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyParentInputEnvelope)
  createMany?: JobProfileCreateManyParentInputEnvelope;

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

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutParentInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutParentInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutParentInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutParentInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutParentInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutParentInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
