import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutRole_typeInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-role-type.input';

@InputType()
export class JobProfileRoleTypeUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutRole_typeInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutRole_typeInput;
}
