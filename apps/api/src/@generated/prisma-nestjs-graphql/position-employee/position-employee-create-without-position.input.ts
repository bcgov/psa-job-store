import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateNestedOneWithoutPositionEmployeeInput } from '../employee/employee-create-nested-one-without-position-employee.input';

@InputType()
export class PositionEmployeeCreateWithoutPositionInput {
  @Field(() => EmployeeCreateNestedOneWithoutPositionEmployeeInput, { nullable: false })
  employee!: EmployeeCreateNestedOneWithoutPositionEmployeeInput;
}
