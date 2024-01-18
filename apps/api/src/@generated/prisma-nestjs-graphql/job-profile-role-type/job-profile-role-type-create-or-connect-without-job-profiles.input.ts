import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileRoleTypeWhereUniqueInput } from './job-profile-role-type-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeCreateWithoutJob_profilesInput } from './job-profile-role-type-create-without-job-profiles.input';

@InputType()
export class JobProfileRoleTypeCreateOrConnectWithoutJob_profilesInput {
  @Field(() => JobProfileRoleTypeWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileRoleTypeWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileRoleTypeWhereUniqueInput, 'id'>;

  @Field(() => JobProfileRoleTypeCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileRoleTypeCreateWithoutJob_profilesInput)
  create!: JobProfileRoleTypeCreateWithoutJob_profilesInput;
}
