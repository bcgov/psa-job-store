import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeUpdateWithoutJob_profilesInput } from './job-profile-role-type-update-without-job-profiles.input';

@InputType()
export class JobProfileRoleTypeUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereInput)
  where?: JobProfileRoleTypeWhereInput;

  @Field(() => JobProfileRoleTypeUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileRoleTypeUpdateWithoutJob_profilesInput)
  data!: JobProfileRoleTypeUpdateWithoutJob_profilesInput;
}
