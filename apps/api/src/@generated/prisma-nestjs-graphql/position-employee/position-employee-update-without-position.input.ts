import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeUpdateOneRequiredWithoutPositionsNestedInput } from '../employee/employee-update-one-required-without-positions-nested.input';

@InputType()
export class PositionEmployeeUpdateWithoutPositionInput {
  @Field(() => EmployeeUpdateOneRequiredWithoutPositionsNestedInput, { nullable: true })
  employee?: EmployeeUpdateOneRequiredWithoutPositionsNestedInput;
}
