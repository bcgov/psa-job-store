import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateNestedOneWithoutPositionsInput } from '../employee/employee-create-nested-one-without-positions.input';
import { PositionCreateNestedOneWithoutEmployeesInput } from '../position/position-create-nested-one-without-employees.input';

@InputType()
export class PositionEmployeeCreateInput {
  @Field(() => EmployeeCreateNestedOneWithoutPositionsInput, { nullable: false })
  employee!: EmployeeCreateNestedOneWithoutPositionsInput;

  @Field(() => PositionCreateNestedOneWithoutEmployeesInput, { nullable: false })
  position!: PositionCreateNestedOneWithoutEmployeesInput;
}
