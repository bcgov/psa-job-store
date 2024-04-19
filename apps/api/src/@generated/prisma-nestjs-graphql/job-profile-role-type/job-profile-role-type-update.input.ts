import { Field, InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutRole_typeNestedInput } from '../job-profile/job-profile-update-many-without-role-type-nested.input';

@InputType()
export class JobProfileRoleTypeUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutRole_typeNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutRole_typeNestedInput;
}
