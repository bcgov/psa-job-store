import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobRoleCreateWithoutProfilesInput } from './job-role-create-without-profiles.input';
import { Type } from 'class-transformer';
import { JobRoleCreateOrConnectWithoutProfilesInput } from './job-role-create-or-connect-without-profiles.input';
import { Prisma } from '@prisma/client';
import { JobRoleWhereUniqueInput } from './job-role-where-unique.input';

@InputType()
export class JobRoleCreateNestedOneWithoutProfilesInput {
  @Field(() => JobRoleCreateWithoutProfilesInput, { nullable: true })
  @Type(() => JobRoleCreateWithoutProfilesInput)
  create?: JobRoleCreateWithoutProfilesInput;

  @Field(() => JobRoleCreateOrConnectWithoutProfilesInput, { nullable: true })
  @Type(() => JobRoleCreateOrConnectWithoutProfilesInput)
  connectOrCreate?: JobRoleCreateOrConnectWithoutProfilesInput;

  @Field(() => JobRoleWhereUniqueInput, { nullable: true })
  @Type(() => JobRoleWhereUniqueInput)
  connect?: Prisma.AtLeast<JobRoleWhereUniqueInput, 'id'>;
}
