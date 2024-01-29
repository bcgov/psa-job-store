import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileRoleTypeUpdateInput } from './job-profile-role-type-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileRoleTypeWhereUniqueInput } from './job-profile-role-type-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileRoleTypeArgs {
  @Field(() => JobProfileRoleTypeUpdateInput, { nullable: false })
  @Type(() => JobProfileRoleTypeUpdateInput)
  data!: JobProfileRoleTypeUpdateInput;

  @Field(() => JobProfileRoleTypeWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileRoleTypeWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileRoleTypeWhereUniqueInput, 'id'>;
}
