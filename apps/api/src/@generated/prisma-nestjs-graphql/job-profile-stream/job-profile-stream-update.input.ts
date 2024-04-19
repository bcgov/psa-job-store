import { Field, InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyUpdateOneRequiredWithoutJobProfileStreamNestedInput } from '../job-profile-job-family/job-profile-job-family-update-one-required-without-job-profile-stream-nested.input';
import { JobProfileStreamLinkUpdateManyWithoutStreamNestedInput } from '../job-profile-stream-link/job-profile-stream-link-update-many-without-stream-nested.input';

@InputType()
export class JobProfileStreamUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileJobFamilyUpdateOneRequiredWithoutJobProfileStreamNestedInput, { nullable: true })
  job_family?: JobProfileJobFamilyUpdateOneRequiredWithoutJobProfileStreamNestedInput;

  @Field(() => JobProfileStreamLinkUpdateManyWithoutStreamNestedInput, { nullable: true })
  jobProfiles?: JobProfileStreamLinkUpdateManyWithoutStreamNestedInput;
}
