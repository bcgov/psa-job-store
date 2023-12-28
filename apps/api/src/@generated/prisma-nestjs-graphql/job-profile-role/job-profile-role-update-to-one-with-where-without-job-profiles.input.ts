import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileRoleWhereInput } from './job-profile-role-where.input';
import { Type } from 'class-transformer';
import { JobProfileRoleUpdateWithoutJob_profilesInput } from './job-profile-role-update-without-job-profiles.input';

@InputType()
export class JobProfileRoleUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => JobProfileRoleWhereInput, { nullable: true })
  @Type(() => JobProfileRoleWhereInput)
  where?: JobProfileRoleWhereInput;

  @Field(() => JobProfileRoleUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileRoleUpdateWithoutJob_profilesInput)
  data!: JobProfileRoleUpdateWithoutJob_profilesInput;
}
