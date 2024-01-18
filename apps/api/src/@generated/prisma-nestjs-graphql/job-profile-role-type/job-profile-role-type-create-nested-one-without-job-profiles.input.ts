import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileRoleTypeCreateWithoutJob_profilesInput } from './job-profile-role-type-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeCreateOrConnectWithoutJob_profilesInput } from './job-profile-role-type-create-or-connect-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { JobProfileRoleTypeWhereUniqueInput } from './job-profile-role-type-where-unique.input';

@InputType()
export class JobProfileRoleTypeCreateNestedOneWithoutJob_profilesInput {
  @Field(() => JobProfileRoleTypeCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileRoleTypeCreateWithoutJob_profilesInput)
  create?: JobProfileRoleTypeCreateWithoutJob_profilesInput;

  @Field(() => JobProfileRoleTypeCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileRoleTypeCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: JobProfileRoleTypeCreateOrConnectWithoutJob_profilesInput;

  @Field(() => JobProfileRoleTypeWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileRoleTypeWhereUniqueInput, 'id'>;
}
