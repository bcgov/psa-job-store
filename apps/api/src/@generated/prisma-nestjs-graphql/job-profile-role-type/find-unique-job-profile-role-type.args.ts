import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeWhereUniqueInput } from './job-profile-role-type-where-unique.input';

@ArgsType()
export class FindUniqueJobProfileRoleTypeArgs {
  @Field(() => JobProfileRoleTypeWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileRoleTypeWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileRoleTypeWhereUniqueInput, 'id'>;
}
