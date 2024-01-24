import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileRoleTypeWhereUniqueInput } from './job-profile-role-type-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueJobProfileRoleTypeArgs {
  @Field(() => JobProfileRoleTypeWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileRoleTypeWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileRoleTypeWhereUniqueInput, 'id'>;
}
