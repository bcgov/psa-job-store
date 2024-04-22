import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeCreateInput } from './job-profile-role-type-create.input';
import { JobProfileRoleTypeUpdateInput } from './job-profile-role-type-update.input';
import { JobProfileRoleTypeWhereUniqueInput } from './job-profile-role-type-where-unique.input';

@ArgsType()
export class UpsertOneJobProfileRoleTypeArgs {
  @Field(() => JobProfileRoleTypeWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileRoleTypeWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileRoleTypeWhereUniqueInput, 'id'>;

  @Field(() => JobProfileRoleTypeCreateInput, { nullable: false })
  @Type(() => JobProfileRoleTypeCreateInput)
  create!: JobProfileRoleTypeCreateInput;

  @Field(() => JobProfileRoleTypeUpdateInput, { nullable: false })
  @Type(() => JobProfileRoleTypeUpdateInput)
  update!: JobProfileRoleTypeUpdateInput;
}
