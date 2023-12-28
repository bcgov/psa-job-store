import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutStreamNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-stream-nested.input';

@InputType()
export class JobProfileStreamUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutStreamNestedInput, { nullable: true })
  job_profiles?: JobProfileUncheckedUpdateManyWithoutStreamNestedInput;
}
