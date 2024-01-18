import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyUpdateOneRequiredWithoutJobProfileStreamNestedInput } from '../job-profile-job-family/job-profile-job-family-update-one-required-without-job-profile-stream-nested.input';
import { JobProfileUpdateManyWithoutStreamNestedInput } from '../job-profile/job-profile-update-many-without-stream-nested.input';

@InputType()
export class JobProfileStreamUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileJobFamilyUpdateOneRequiredWithoutJobProfileStreamNestedInput, { nullable: true })
  job_family?: JobProfileJobFamilyUpdateOneRequiredWithoutJobProfileStreamNestedInput;

  @Field(() => JobProfileUpdateManyWithoutStreamNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutStreamNestedInput;
}
