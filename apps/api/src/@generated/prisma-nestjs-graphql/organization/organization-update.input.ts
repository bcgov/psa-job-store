import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUpdateManyWithoutOrganizationNestedInput } from '../department/department-update-many-without-organization-nested.input';
import { JobProfileOrganizationUpdateManyWithoutOrganizationNestedInput } from '../job-profile-organization/job-profile-organization-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => DepartmentUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  departments?: DepartmentUpdateManyWithoutOrganizationNestedInput;

  @Field(() => JobProfileOrganizationUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  JobProfileOrganization?: JobProfileOrganizationUpdateManyWithoutOrganizationNestedInput;
}
