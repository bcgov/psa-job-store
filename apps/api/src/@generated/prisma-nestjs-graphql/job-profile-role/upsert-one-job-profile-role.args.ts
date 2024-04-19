import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileRoleCreateInput } from './job-profile-role-create.input';
import { JobProfileRoleUpdateInput } from './job-profile-role-update.input';
import { JobProfileRoleWhereUniqueInput } from './job-profile-role-where-unique.input';

@ArgsType()
export class UpsertOneJobProfileRoleArgs {
  @Field(() => JobProfileRoleWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileRoleWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileRoleWhereUniqueInput, 'id'>;

  @Field(() => JobProfileRoleCreateInput, { nullable: false })
  @Type(() => JobProfileRoleCreateInput)
  create!: JobProfileRoleCreateInput;

  @Field(() => JobProfileRoleUpdateInput, { nullable: false })
  @Type(() => JobProfileRoleUpdateInput)
  update!: JobProfileRoleUpdateInput;
}
