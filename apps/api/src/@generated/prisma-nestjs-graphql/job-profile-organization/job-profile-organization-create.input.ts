import { Field, InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedOneWithoutOrganizationsInput } from '../job-profile/job-profile-create-nested-one-without-organizations.input';
import { OrganizationCreateNestedOneWithoutJobProfileOrganizationInput } from '../organization/organization-create-nested-one-without-job-profile-organization.input';

@InputType()
export class JobProfileOrganizationCreateInput {
  @Field(() => OrganizationCreateNestedOneWithoutJobProfileOrganizationInput, { nullable: false })
  organization!: OrganizationCreateNestedOneWithoutJobProfileOrganizationInput;

  @Field(() => JobProfileCreateNestedOneWithoutOrganizationsInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutOrganizationsInput;
}
