import { Field, InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutRole_typeInput } from '../job-profile/job-profile-create-nested-many-without-role-type.input';

@InputType()
export class JobProfileRoleTypeCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutRole_typeInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutRole_typeInput;
}
