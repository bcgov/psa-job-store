import { Field, InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutScopeNestedInput } from '../job-profile/job-profile-update-many-without-scope-nested.input';

@InputType()
export class JobProfileScopeUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => JobProfileUpdateManyWithoutScopeNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutScopeNestedInput;
}
