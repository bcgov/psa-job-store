import { Field, InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyUpdateOneRequiredWithoutJobProfilesNestedInput } from '../job-profile-job-family/job-profile-job-family-update-one-required-without-job-profiles-nested.input';

@InputType()
export class JobProfileJobFamilyLinkUpdateWithoutJobProfileInput {
  @Field(() => JobProfileJobFamilyUpdateOneRequiredWithoutJobProfilesNestedInput, { nullable: true })
  jobFamily?: JobProfileJobFamilyUpdateOneRequiredWithoutJobProfilesNestedInput;
}
