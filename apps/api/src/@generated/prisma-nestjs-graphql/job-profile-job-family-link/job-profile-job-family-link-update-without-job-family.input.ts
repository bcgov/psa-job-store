import { Field, InputType } from '@nestjs/graphql';
import { JobProfileUpdateOneRequiredWithoutJobFamiliesNestedInput } from '../job-profile/job-profile-update-one-required-without-job-families-nested.input';

@InputType()
export class JobProfileJobFamilyLinkUpdateWithoutJobFamilyInput {
  @Field(() => JobProfileUpdateOneRequiredWithoutJobFamiliesNestedInput, { nullable: true })
  jobProfile?: JobProfileUpdateOneRequiredWithoutJobFamiliesNestedInput;
}
