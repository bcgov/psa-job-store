import { Field, InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyUpdateOneRequiredWithoutJobProfilesNestedInput } from '../job-profile-job-family/job-profile-job-family-update-one-required-without-job-profiles-nested.input';
import { JobProfileUpdateOneRequiredWithoutJobFamiliesNestedInput } from '../job-profile/job-profile-update-one-required-without-job-families-nested.input';

@InputType()
export class JobProfileJobFamilyLinkUpdateInput {
  @Field(() => JobProfileUpdateOneRequiredWithoutJobFamiliesNestedInput, { nullable: true })
  jobProfile?: JobProfileUpdateOneRequiredWithoutJobFamiliesNestedInput;

  @Field(() => JobProfileJobFamilyUpdateOneRequiredWithoutJobProfilesNestedInput, { nullable: true })
  jobFamily?: JobProfileJobFamilyUpdateOneRequiredWithoutJobProfilesNestedInput;
}
