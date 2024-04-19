import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutRoleInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-role.input';

@InputType()
export class JobProfileRoleUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutRoleInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutRoleInput;
}
