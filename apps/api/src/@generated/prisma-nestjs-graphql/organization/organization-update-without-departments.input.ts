import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationUpdateManyWithoutOrganizationNestedInput } from '../job-profile-organization/job-profile-organization-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUpdateWithoutDepartmentsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileOrganizationUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  JobProfileOrganization?: JobProfileOrganizationUpdateManyWithoutOrganizationNestedInput;
}
