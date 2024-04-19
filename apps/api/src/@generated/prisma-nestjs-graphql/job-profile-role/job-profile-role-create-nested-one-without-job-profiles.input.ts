import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileRoleCreateOrConnectWithoutJob_profilesInput } from './job-profile-role-create-or-connect-without-job-profiles.input';
import { JobProfileRoleCreateWithoutJob_profilesInput } from './job-profile-role-create-without-job-profiles.input';
import { JobProfileRoleWhereUniqueInput } from './job-profile-role-where-unique.input';

@InputType()
export class JobProfileRoleCreateNestedOneWithoutJob_profilesInput {
  @Field(() => JobProfileRoleCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileRoleCreateWithoutJob_profilesInput)
  create?: JobProfileRoleCreateWithoutJob_profilesInput;

  @Field(() => JobProfileRoleCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileRoleCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: JobProfileRoleCreateOrConnectWithoutJob_profilesInput;

  @Field(() => JobProfileRoleWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileRoleWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileRoleWhereUniqueInput, 'id'>;
}
