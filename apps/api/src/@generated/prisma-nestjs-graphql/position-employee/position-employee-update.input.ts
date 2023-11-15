import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeUpdateOneRequiredWithoutPositionEmployeeNestedInput } from '../employee/employee-update-one-required-without-position-employee-nested.input';
import { PositionUpdateOneRequiredWithoutEmployeesNestedInput } from '../position/position-update-one-required-without-employees-nested.input';

@InputType()
export class PositionEmployeeUpdateInput {
  @Field(() => EmployeeUpdateOneRequiredWithoutPositionEmployeeNestedInput, { nullable: true })
  employee?: EmployeeUpdateOneRequiredWithoutPositionEmployeeNestedInput;

  @Field(() => PositionUpdateOneRequiredWithoutEmployeesNestedInput, { nullable: true })
  position?: PositionUpdateOneRequiredWithoutEmployeesNestedInput;
}
