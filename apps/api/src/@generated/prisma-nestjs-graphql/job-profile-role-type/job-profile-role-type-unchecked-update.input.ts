import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutRole_typeNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-role-type-nested.input';

@InputType()
export class JobProfileRoleTypeUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutRole_typeNestedInput, { nullable: true })
  job_profiles?: JobProfileUncheckedUpdateManyWithoutRole_typeNestedInput;
}
