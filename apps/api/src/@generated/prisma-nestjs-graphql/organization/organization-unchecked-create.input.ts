import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUncheckedCreateNestedManyWithoutOrganizationInput } from '../department/department-unchecked-create-nested-many-without-organization.input';
import { JobProfileOrganizationUncheckedCreateNestedManyWithoutOrganizationInput } from '../job-profile-organization/job-profile-organization-unchecked-create-nested-many-without-organization.input';

@InputType()
export class OrganizationUncheckedCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date | string;

  @Field(() => DepartmentUncheckedCreateNestedManyWithoutOrganizationInput, { nullable: true })
  departments?: DepartmentUncheckedCreateNestedManyWithoutOrganizationInput;

  @Field(() => JobProfileOrganizationUncheckedCreateNestedManyWithoutOrganizationInput, { nullable: true })
  JobProfileOrganization?: JobProfileOrganizationUncheckedCreateNestedManyWithoutOrganizationInput;
}
