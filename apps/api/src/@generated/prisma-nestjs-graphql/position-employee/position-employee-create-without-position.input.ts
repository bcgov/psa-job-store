import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateNestedOneWithoutPositionsInput } from '../employee/employee-create-nested-one-without-positions.input';

@InputType()
export class PositionEmployeeCreateWithoutPositionInput {
  @Field(() => EmployeeCreateNestedOneWithoutPositionsInput, { nullable: false })
  employee!: EmployeeCreateNestedOneWithoutPositionsInput;
}
