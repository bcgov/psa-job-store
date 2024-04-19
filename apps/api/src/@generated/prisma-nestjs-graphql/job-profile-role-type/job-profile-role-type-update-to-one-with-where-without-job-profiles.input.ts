import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeUpdateWithoutJob_profilesInput } from './job-profile-role-type-update-without-job-profiles.input';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';

@InputType()
export class JobProfileRoleTypeUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereInput)
  where?: JobProfileRoleTypeWhereInput;

  @Field(() => JobProfileRoleTypeUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileRoleTypeUpdateWithoutJob_profilesInput)
  data!: JobProfileRoleTypeUpdateWithoutJob_profilesInput;
}
