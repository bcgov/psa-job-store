import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileRoleWhereUniqueInput } from './job-profile-role-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileRoleCreateWithoutJob_profilesInput } from './job-profile-role-create-without-job-profiles.input';

@InputType()
export class JobProfileRoleCreateOrConnectWithoutJob_profilesInput {
  @Field(() => JobProfileRoleWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileRoleWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileRoleWhereUniqueInput, 'id'>;

  @Field(() => JobProfileRoleCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileRoleCreateWithoutJob_profilesInput)
  create!: JobProfileRoleCreateWithoutJob_profilesInput;
}
