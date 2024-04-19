import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateManyRoleInputEnvelope } from './job-profile-create-many-role-input-envelope.input';
import { JobProfileCreateOrConnectWithoutRoleInput } from './job-profile-create-or-connect-without-role.input';
import { JobProfileCreateWithoutRoleInput } from './job-profile-create-without-role.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';
import { JobProfileUpdateManyWithWhereWithoutRoleInput } from './job-profile-update-many-with-where-without-role.input';
import { JobProfileUpdateWithWhereUniqueWithoutRoleInput } from './job-profile-update-with-where-unique-without-role.input';
import { JobProfileUpsertWithWhereUniqueWithoutRoleInput } from './job-profile-upsert-with-where-unique-without-role.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUpdateManyWithoutRoleNestedInput {
  @Field(() => [JobProfileCreateWithoutRoleInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutRoleInput)
  create?: Array<JobProfileCreateWithoutRoleInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutRoleInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutRoleInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutRoleInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutRoleInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutRoleInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutRoleInput>;

  @Field(() => JobProfileCreateManyRoleInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyRoleInputEnvelope)
  createMany?: JobProfileCreateManyRoleInputEnvelope;

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

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutRoleInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutRoleInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutRoleInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutRoleInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutRoleInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutRoleInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
