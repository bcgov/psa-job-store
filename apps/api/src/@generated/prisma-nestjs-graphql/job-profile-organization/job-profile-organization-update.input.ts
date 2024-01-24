import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationUpdateOneRequiredWithoutJobProfileOrganizationNestedInput } from '../organization/organization-update-one-required-without-job-profile-organization-nested.input';
import { JobProfileUpdateOneRequiredWithoutOrganizationsNestedInput } from '../job-profile/job-profile-update-one-required-without-organizations-nested.input';

@InputType()
export class JobProfileOrganizationUpdateInput {
  @Field(() => OrganizationUpdateOneRequiredWithoutJobProfileOrganizationNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneRequiredWithoutJobProfileOrganizationNestedInput;

  @Field(() => JobProfileUpdateOneRequiredWithoutOrganizationsNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutOrganizationsNestedInput;
}
