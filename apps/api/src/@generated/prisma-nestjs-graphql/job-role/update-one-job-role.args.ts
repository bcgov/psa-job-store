import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobRoleUpdateInput } from './job-role-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobRoleWhereUniqueInput } from './job-role-where-unique.input';

@ArgsType()
export class UpdateOneJobRoleArgs {
  @Field(() => JobRoleUpdateInput, { nullable: false })
  @Type(() => JobRoleUpdateInput)
  data!: JobRoleUpdateInput;

  @Field(() => JobRoleWhereUniqueInput, { nullable: false })
  @Type(() => JobRoleWhereUniqueInput)
  where!: Prisma.AtLeast<JobRoleWhereUniqueInput, 'id'>;
}
