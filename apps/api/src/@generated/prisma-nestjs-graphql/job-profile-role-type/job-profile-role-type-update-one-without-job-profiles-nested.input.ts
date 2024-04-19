import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeCreateOrConnectWithoutJob_profilesInput } from './job-profile-role-type-create-or-connect-without-job-profiles.input';
import { JobProfileRoleTypeCreateWithoutJob_profilesInput } from './job-profile-role-type-create-without-job-profiles.input';
import { JobProfileRoleTypeUpdateToOneWithWhereWithoutJob_profilesInput } from './job-profile-role-type-update-to-one-with-where-without-job-profiles.input';
import { JobProfileRoleTypeUpsertWithoutJob_profilesInput } from './job-profile-role-type-upsert-without-job-profiles.input';
import { JobProfileRoleTypeWhereUniqueInput } from './job-profile-role-type-where-unique.input';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';

@InputType()
export class JobProfileRoleTypeUpdateOneWithoutJob_profilesNestedInput {
  @Field(() => JobProfileRoleTypeCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileRoleTypeCreateWithoutJob_profilesInput)
  create?: JobProfileRoleTypeCreateWithoutJob_profilesInput;

  @Field(() => JobProfileRoleTypeCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileRoleTypeCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: JobProfileRoleTypeCreateOrConnectWithoutJob_profilesInput;

  @Field(() => JobProfileRoleTypeUpsertWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileRoleTypeUpsertWithoutJob_profilesInput)
  upsert?: JobProfileRoleTypeUpsertWithoutJob_profilesInput;

  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereInput)
  disconnect?: JobProfileRoleTypeWhereInput;

  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereInput)
  delete?: JobProfileRoleTypeWhereInput;

  @Field(() => JobProfileRoleTypeWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileRoleTypeWhereUniqueInput, 'id'>;

  @Field(() => JobProfileRoleTypeUpdateToOneWithWhereWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileRoleTypeUpdateToOneWithWhereWithoutJob_profilesInput)
  update?: JobProfileRoleTypeUpdateToOneWithWhereWithoutJob_profilesInput;
}
