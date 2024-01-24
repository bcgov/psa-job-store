import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileRoleWhereUniqueInput } from './job-profile-role-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueJobProfileRoleArgs {
  @Field(() => JobProfileRoleWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileRoleWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileRoleWhereUniqueInput, 'id'>;
}
