import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeUpdateOneRequiredWithoutPositionsNestedInput } from '../employee/employee-update-one-required-without-positions-nested.input';
import { PositionUpdateOneRequiredWithoutEmployeesNestedInput } from '../position/position-update-one-required-without-employees-nested.input';

@InputType()
export class PositionEmployeeUpdateInput {
  @Field(() => EmployeeUpdateOneRequiredWithoutPositionsNestedInput, { nullable: true })
  employee?: EmployeeUpdateOneRequiredWithoutPositionsNestedInput;

  @Field(() => PositionUpdateOneRequiredWithoutEmployeesNestedInput, { nullable: true })
  position?: PositionUpdateOneRequiredWithoutEmployeesNestedInput;
}
