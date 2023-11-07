import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobRoleWhereUniqueInput } from './job-role-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueJobRoleArgs {
  @Field(() => JobRoleWhereUniqueInput, { nullable: false })
  @Type(() => JobRoleWhereUniqueInput)
  where!: Prisma.AtLeast<JobRoleWhereUniqueInput, 'id'>;
}
