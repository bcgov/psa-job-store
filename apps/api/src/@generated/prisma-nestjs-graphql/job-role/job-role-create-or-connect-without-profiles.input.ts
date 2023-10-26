import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobRoleWhereUniqueInput } from './job-role-where-unique.input';
import { Type } from 'class-transformer';
import { JobRoleCreateWithoutProfilesInput } from './job-role-create-without-profiles.input';

@InputType()
export class JobRoleCreateOrConnectWithoutProfilesInput {
  @Field(() => JobRoleWhereUniqueInput, { nullable: false })
  @Type(() => JobRoleWhereUniqueInput)
  where!: Prisma.AtLeast<JobRoleWhereUniqueInput, 'id'>;

  @Field(() => JobRoleCreateWithoutProfilesInput, { nullable: false })
  @Type(() => JobRoleCreateWithoutProfilesInput)
  create!: JobRoleCreateWithoutProfilesInput;
}
