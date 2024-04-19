import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateManyRole_typeInputEnvelope } from './job-profile-create-many-role-type-input-envelope.input';
import { JobProfileCreateOrConnectWithoutRole_typeInput } from './job-profile-create-or-connect-without-role-type.input';
import { JobProfileCreateWithoutRole_typeInput } from './job-profile-create-without-role-type.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';
import { JobProfileUpdateManyWithWhereWithoutRole_typeInput } from './job-profile-update-many-with-where-without-role-type.input';
import { JobProfileUpdateWithWhereUniqueWithoutRole_typeInput } from './job-profile-update-with-where-unique-without-role-type.input';
import { JobProfileUpsertWithWhereUniqueWithoutRole_typeInput } from './job-profile-upsert-with-where-unique-without-role-type.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUpdateManyWithoutRole_typeNestedInput {
  @Field(() => [JobProfileCreateWithoutRole_typeInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutRole_typeInput)
  create?: Array<JobProfileCreateWithoutRole_typeInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutRole_typeInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutRole_typeInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutRole_typeInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutRole_typeInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutRole_typeInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutRole_typeInput>;

  @Field(() => JobProfileCreateManyRole_typeInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyRole_typeInputEnvelope)
  createMany?: JobProfileCreateManyRole_typeInputEnvelope;

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

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutRole_typeInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutRole_typeInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutRole_typeInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutRole_typeInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutRole_typeInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutRole_typeInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
