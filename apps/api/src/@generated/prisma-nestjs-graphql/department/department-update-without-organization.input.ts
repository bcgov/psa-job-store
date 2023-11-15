import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionUpdateManyWithoutDepartmentNestedInput } from '../position/position-update-many-without-department-nested.input';
import { EmployeeUpdateManyWithoutDepartmentNestedInput } from '../employee/employee-update-many-without-department-nested.input';

@InputType()
export class DepartmentUpdateWithoutOrganizationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => PositionUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  Position?: PositionUpdateManyWithoutDepartmentNestedInput;

  @Field(() => EmployeeUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  Employee?: EmployeeUpdateManyWithoutDepartmentNestedInput;
}
