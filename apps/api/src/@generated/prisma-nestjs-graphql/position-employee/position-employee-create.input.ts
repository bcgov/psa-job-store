import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateNestedOneWithoutPositionEmployeeInput } from '../employee/employee-create-nested-one-without-position-employee.input';
import { PositionCreateNestedOneWithoutEmployeesInput } from '../position/position-create-nested-one-without-employees.input';

@InputType()
export class PositionEmployeeCreateInput {
  @Field(() => EmployeeCreateNestedOneWithoutPositionEmployeeInput, { nullable: false })
  employee!: EmployeeCreateNestedOneWithoutPositionEmployeeInput;

  @Field(() => PositionCreateNestedOneWithoutEmployeesInput, { nullable: false })
  position!: PositionCreateNestedOneWithoutEmployeesInput;
}
