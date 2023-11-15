import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationUpdateOneRequiredWithoutDepartmentsNestedInput } from '../organization/organization-update-one-required-without-departments-nested.input';
import { PositionUpdateManyWithoutDepartmentNestedInput } from '../position/position-update-many-without-department-nested.input';
import { EmployeeUpdateManyWithoutDepartmentNestedInput } from '../employee/employee-update-many-without-department-nested.input';

@InputType()
export class DepartmentUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => OrganizationUpdateOneRequiredWithoutDepartmentsNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneRequiredWithoutDepartmentsNestedInput;

  @Field(() => PositionUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  Position?: PositionUpdateManyWithoutDepartmentNestedInput;

  @Field(() => EmployeeUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  Employee?: EmployeeUpdateManyWithoutDepartmentNestedInput;
}
