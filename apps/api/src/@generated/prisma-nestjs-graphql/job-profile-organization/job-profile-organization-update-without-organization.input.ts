import { Field, InputType } from '@nestjs/graphql';
import { JobProfileUpdateOneRequiredWithoutOrganizationsNestedInput } from '../job-profile/job-profile-update-one-required-without-organizations-nested.input';

@InputType()
export class JobProfileOrganizationUpdateWithoutOrganizationInput {
  @Field(() => JobProfileUpdateOneRequiredWithoutOrganizationsNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutOrganizationsNestedInput;
}
