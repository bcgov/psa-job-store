import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeUpdateOneRequiredWithoutPositionEmployeeNestedInput } from '../employee/employee-update-one-required-without-position-employee-nested.input';

@InputType()
export class PositionEmployeeUpdateWithoutPositionInput {
  @Field(() => EmployeeUpdateOneRequiredWithoutPositionEmployeeNestedInput, { nullable: true })
  employee?: EmployeeUpdateOneRequiredWithoutPositionEmployeeNestedInput;
}
