import { Field, InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutRoleInput } from '../job-profile/job-profile-create-nested-many-without-role.input';

@InputType()
export class JobProfileRoleCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutRoleInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutRoleInput;
}
