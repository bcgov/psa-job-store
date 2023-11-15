import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput } from '../department/department-unchecked-update-many-without-organization-nested.input';
import { EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput } from '../employee/employee-unchecked-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUncheckedUpdateWithoutPositionsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  departments?: DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput;

  @Field(() => EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  employees?: EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput;
}
