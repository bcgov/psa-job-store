import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileRoleUpdateInput } from './job-profile-role-update.input';
import { JobProfileRoleWhereUniqueInput } from './job-profile-role-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileRoleArgs {
  @Field(() => JobProfileRoleUpdateInput, { nullable: false })
  @Type(() => JobProfileRoleUpdateInput)
  data!: JobProfileRoleUpdateInput;

  @Field(() => JobProfileRoleWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileRoleWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileRoleWhereUniqueInput, 'id'>;
}
