import { Field, InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutRoleNestedInput } from '../job-profile/job-profile-update-many-without-role-nested.input';

@InputType()
export class JobProfileRoleUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutRoleNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutRoleNestedInput;
}
