import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobRoleWhereUniqueInput } from './job-role-where-unique.input';
import { Type } from 'class-transformer';
import { JobRoleCreateInput } from './job-role-create.input';
import { JobRoleUpdateInput } from './job-role-update.input';

@ArgsType()
export class UpsertOneJobRoleArgs {
  @Field(() => JobRoleWhereUniqueInput, { nullable: false })
  @Type(() => JobRoleWhereUniqueInput)
  where!: Prisma.AtLeast<JobRoleWhereUniqueInput, 'id'>;

  @Field(() => JobRoleCreateInput, { nullable: false })
  @Type(() => JobRoleCreateInput)
  create!: JobRoleCreateInput;

  @Field(() => JobRoleUpdateInput, { nullable: false })
  @Type(() => JobRoleUpdateInput)
  update!: JobRoleUpdateInput;
}
