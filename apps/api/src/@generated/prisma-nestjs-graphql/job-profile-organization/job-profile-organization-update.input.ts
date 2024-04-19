import { Field, InputType } from '@nestjs/graphql';
import { JobProfileUpdateOneRequiredWithoutOrganizationsNestedInput } from '../job-profile/job-profile-update-one-required-without-organizations-nested.input';
import { OrganizationUpdateOneRequiredWithoutJobProfileOrganizationNestedInput } from '../organization/organization-update-one-required-without-job-profile-organization-nested.input';

@InputType()
export class JobProfileOrganizationUpdateInput {
  @Field(() => OrganizationUpdateOneRequiredWithoutJobProfileOrganizationNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneRequiredWithoutJobProfileOrganizationNestedInput;

  @Field(() => JobProfileUpdateOneRequiredWithoutOrganizationsNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutOrganizationsNestedInput;
}
