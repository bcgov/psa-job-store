import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobRoleCreateWithoutProfilesInput } from './job-role-create-without-profiles.input';
import { Type } from 'class-transformer';
import { JobRoleCreateOrConnectWithoutProfilesInput } from './job-role-create-or-connect-without-profiles.input';
import { JobRoleUpsertWithoutProfilesInput } from './job-role-upsert-without-profiles.input';
import { JobRoleWhereInput } from './job-role-where.input';
import { Prisma } from '@prisma/client';
import { JobRoleWhereUniqueInput } from './job-role-where-unique.input';
import { JobRoleUpdateToOneWithWhereWithoutProfilesInput } from './job-role-update-to-one-with-where-without-profiles.input';

@InputType()
export class JobRoleUpdateOneWithoutProfilesNestedInput {
  @Field(() => JobRoleCreateWithoutProfilesInput, { nullable: true })
  @Type(() => JobRoleCreateWithoutProfilesInput)
  create?: JobRoleCreateWithoutProfilesInput;

  @Field(() => JobRoleCreateOrConnectWithoutProfilesInput, { nullable: true })
  @Type(() => JobRoleCreateOrConnectWithoutProfilesInput)
  connectOrCreate?: JobRoleCreateOrConnectWithoutProfilesInput;

  @Field(() => JobRoleUpsertWithoutProfilesInput, { nullable: true })
  @Type(() => JobRoleUpsertWithoutProfilesInput)
  upsert?: JobRoleUpsertWithoutProfilesInput;

  @Field(() => JobRoleWhereInput, { nullable: true })
  @Type(() => JobRoleWhereInput)
  disconnect?: JobRoleWhereInput;

  @Field(() => JobRoleWhereInput, { nullable: true })
  @Type(() => JobRoleWhereInput)
  delete?: JobRoleWhereInput;

  @Field(() => JobRoleWhereUniqueInput, { nullable: true })
  @Type(() => JobRoleWhereUniqueInput)
  connect?: Prisma.AtLeast<JobRoleWhereUniqueInput, 'id'>;

  @Field(() => JobRoleUpdateToOneWithWhereWithoutProfilesInput, { nullable: true })
  @Type(() => JobRoleUpdateToOneWithWhereWithoutProfilesInput)
  update?: JobRoleUpdateToOneWithWhereWithoutProfilesInput;
}
