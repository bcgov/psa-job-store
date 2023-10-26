import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutRoleInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-role.input';

@InputType()
export class JobRoleUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutRoleInput, { nullable: true })
  profiles?: JobProfileUncheckedCreateNestedManyWithoutRoleInput;
}
