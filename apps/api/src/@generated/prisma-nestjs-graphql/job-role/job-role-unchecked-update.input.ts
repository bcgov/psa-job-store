import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutRoleNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-role-nested.input';

@InputType()
export class JobRoleUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutRoleNestedInput, { nullable: true })
  profiles?: JobProfileUncheckedUpdateManyWithoutRoleNestedInput;
}
