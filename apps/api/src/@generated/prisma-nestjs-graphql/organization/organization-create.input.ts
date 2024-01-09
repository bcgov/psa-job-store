import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateNestedManyWithoutOrganizationInput } from '../department/department-create-nested-many-without-organization.input';
import { JobProfileOrganizationCreateNestedManyWithoutOrganizationInput } from '../job-profile-organization/job-profile-organization-create-nested-many-without-organization.input';

@InputType()
export class OrganizationCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => DepartmentCreateNestedManyWithoutOrganizationInput, { nullable: true })
  departments?: DepartmentCreateNestedManyWithoutOrganizationInput;

  @Field(() => JobProfileOrganizationCreateNestedManyWithoutOrganizationInput, { nullable: true })
  JobProfileOrganization?: JobProfileOrganizationCreateNestedManyWithoutOrganizationInput;
}
