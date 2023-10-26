import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobRoleUpdateWithoutProfilesInput } from './job-role-update-without-profiles.input';
import { Type } from 'class-transformer';
import { JobRoleCreateWithoutProfilesInput } from './job-role-create-without-profiles.input';
import { JobRoleWhereInput } from './job-role-where.input';

@InputType()
export class JobRoleUpsertWithoutProfilesInput {
  @Field(() => JobRoleUpdateWithoutProfilesInput, { nullable: false })
  @Type(() => JobRoleUpdateWithoutProfilesInput)
  update!: JobRoleUpdateWithoutProfilesInput;

  @Field(() => JobRoleCreateWithoutProfilesInput, { nullable: false })
  @Type(() => JobRoleCreateWithoutProfilesInput)
  create!: JobRoleCreateWithoutProfilesInput;

  @Field(() => JobRoleWhereInput, { nullable: true })
  @Type(() => JobRoleWhereInput)
  where?: JobRoleWhereInput;
}
