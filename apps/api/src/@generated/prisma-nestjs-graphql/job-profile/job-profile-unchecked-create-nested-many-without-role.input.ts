import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateManyRoleInputEnvelope } from './job-profile-create-many-role-input-envelope.input';
import { JobProfileCreateOrConnectWithoutRoleInput } from './job-profile-create-or-connect-without-role.input';
import { JobProfileCreateWithoutRoleInput } from './job-profile-create-without-role.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUncheckedCreateNestedManyWithoutRoleInput {
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
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>>;
}
