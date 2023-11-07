import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutRoleInput } from './job-profile-create-without-role.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutRoleInput } from './job-profile-create-or-connect-without-role.input';
import { JobProfileCreateManyRoleInputEnvelope } from './job-profile-create-many-role-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedManyWithoutRoleInput {
  @Field(() => [JobProfileCreateWithoutRoleInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutRoleInput)
  create?: Array<JobProfileCreateWithoutRoleInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutRoleInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutRoleInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutRoleInput>;

  @Field(() => JobProfileCreateManyRoleInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyRoleInputEnvelope)
  createMany?: JobProfileCreateManyRoleInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;
}
