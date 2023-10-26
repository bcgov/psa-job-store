import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobRoleWhereInput } from './job-role-where.input';
import { Type } from 'class-transformer';
import { JobRoleUpdateWithoutProfilesInput } from './job-role-update-without-profiles.input';

@InputType()
export class JobRoleUpdateToOneWithWhereWithoutProfilesInput {
  @Field(() => JobRoleWhereInput, { nullable: true })
  @Type(() => JobRoleWhereInput)
  where?: JobRoleWhereInput;

  @Field(() => JobRoleUpdateWithoutProfilesInput, { nullable: false })
  @Type(() => JobRoleUpdateWithoutProfilesInput)
  data!: JobRoleUpdateWithoutProfilesInput;
}
