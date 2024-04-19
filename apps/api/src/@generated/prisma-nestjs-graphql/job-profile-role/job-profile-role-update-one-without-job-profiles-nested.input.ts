import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileRoleCreateOrConnectWithoutJob_profilesInput } from './job-profile-role-create-or-connect-without-job-profiles.input';
import { JobProfileRoleCreateWithoutJob_profilesInput } from './job-profile-role-create-without-job-profiles.input';
import { JobProfileRoleUpdateToOneWithWhereWithoutJob_profilesInput } from './job-profile-role-update-to-one-with-where-without-job-profiles.input';
import { JobProfileRoleUpsertWithoutJob_profilesInput } from './job-profile-role-upsert-without-job-profiles.input';
import { JobProfileRoleWhereUniqueInput } from './job-profile-role-where-unique.input';
import { JobProfileRoleWhereInput } from './job-profile-role-where.input';

@InputType()
export class JobProfileRoleUpdateOneWithoutJob_profilesNestedInput {
  @Field(() => JobProfileRoleCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileRoleCreateWithoutJob_profilesInput)
  create?: JobProfileRoleCreateWithoutJob_profilesInput;

  @Field(() => JobProfileRoleCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileRoleCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: JobProfileRoleCreateOrConnectWithoutJob_profilesInput;

  @Field(() => JobProfileRoleUpsertWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileRoleUpsertWithoutJob_profilesInput)
  upsert?: JobProfileRoleUpsertWithoutJob_profilesInput;

  @Field(() => JobProfileRoleWhereInput, { nullable: true })
  @Type(() => JobProfileRoleWhereInput)
  disconnect?: JobProfileRoleWhereInput;

  @Field(() => JobProfileRoleWhereInput, { nullable: true })
  @Type(() => JobProfileRoleWhereInput)
  delete?: JobProfileRoleWhereInput;

  @Field(() => JobProfileRoleWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileRoleWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileRoleWhereUniqueInput, 'id'>;

  @Field(() => JobProfileRoleUpdateToOneWithWhereWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileRoleUpdateToOneWithWhereWithoutJob_profilesInput)
  update?: JobProfileRoleUpdateToOneWithWhereWithoutJob_profilesInput;
}
