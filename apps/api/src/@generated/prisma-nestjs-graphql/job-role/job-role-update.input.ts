import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutRoleNestedInput } from '../job-profile/job-profile-update-many-without-role-nested.input';

@InputType()
export class JobRoleUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutRoleNestedInput, { nullable: true })
  profiles?: JobProfileUpdateManyWithoutRoleNestedInput;
}
