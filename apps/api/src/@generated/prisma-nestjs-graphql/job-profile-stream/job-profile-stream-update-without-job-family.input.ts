import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutStreamNestedInput } from '../job-profile/job-profile-update-many-without-stream-nested.input';

@InputType()
export class JobProfileStreamUpdateWithoutJob_familyInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutStreamNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutStreamNestedInput;
}
