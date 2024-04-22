import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutRoleNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-role-nested.input';

@InputType()
export class JobProfileRoleUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutRoleNestedInput, { nullable: true })
  job_profiles?: JobProfileUncheckedUpdateManyWithoutRoleNestedInput;
}
