import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyUpdateOneRequiredWithoutJobProfileStreamNestedInput } from '../job-profile-job-family/job-profile-job-family-update-one-required-without-job-profile-stream-nested.input';

@InputType()
export class JobProfileStreamUpdateWithoutJobProfilesInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileJobFamilyUpdateOneRequiredWithoutJobProfileStreamNestedInput, { nullable: true })
  job_family?: JobProfileJobFamilyUpdateOneRequiredWithoutJobProfileStreamNestedInput;
}
