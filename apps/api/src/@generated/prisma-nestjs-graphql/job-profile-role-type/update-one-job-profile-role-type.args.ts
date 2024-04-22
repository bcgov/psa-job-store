import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeUpdateInput } from './job-profile-role-type-update.input';
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
