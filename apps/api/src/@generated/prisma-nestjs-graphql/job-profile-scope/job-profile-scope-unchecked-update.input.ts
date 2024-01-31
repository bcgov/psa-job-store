import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutScopeNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-scope-nested.input';

@InputType()
export class JobProfileScopeUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutScopeNestedInput, { nullable: true })
  job_profiles?: JobProfileUncheckedUpdateManyWithoutScopeNestedInput;
}
