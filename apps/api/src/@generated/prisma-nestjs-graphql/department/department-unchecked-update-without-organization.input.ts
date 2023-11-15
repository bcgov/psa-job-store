import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionUncheckedUpdateManyWithoutDepartmentNestedInput } from '../position/position-unchecked-update-many-without-department-nested.input';
import { EmployeeUncheckedUpdateManyWithoutDepartmentNestedInput } from '../employee/employee-unchecked-update-many-without-department-nested.input';

@InputType()
export class DepartmentUncheckedUpdateWithoutOrganizationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => PositionUncheckedUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  Position?: PositionUncheckedUpdateManyWithoutDepartmentNestedInput;

  @Field(() => EmployeeUncheckedUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  Employee?: EmployeeUncheckedUpdateManyWithoutDepartmentNestedInput;
}
