import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutRoleInput } from '../job-profile/job-profile-create-nested-many-without-role.input';

@InputType()
export class JobRoleCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutRoleInput, { nullable: true })
  profiles?: JobProfileCreateNestedManyWithoutRoleInput;
}
