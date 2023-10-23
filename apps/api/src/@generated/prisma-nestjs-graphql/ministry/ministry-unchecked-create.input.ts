import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutMinistryInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-ministry.input';

@InputType()
export class MinistryUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutMinistryInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutMinistryInput;
}
