import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput } from '../job-profile-organization/job-profile-organization-unchecked-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUncheckedUpdateWithoutDepartmentsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  JobProfileOrganization?: JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput;
}
