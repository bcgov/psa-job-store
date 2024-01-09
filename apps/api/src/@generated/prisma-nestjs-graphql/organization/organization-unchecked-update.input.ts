import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput } from '../department/department-unchecked-update-many-without-organization-nested.input';
import { JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput } from '../job-profile-organization/job-profile-organization-unchecked-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUncheckedUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  departments?: DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput;

  @Field(() => JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  JobProfileOrganization?: JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput;
}
