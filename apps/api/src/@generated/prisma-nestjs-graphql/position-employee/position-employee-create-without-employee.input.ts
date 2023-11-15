import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateNestedOneWithoutEmployeesInput } from '../position/position-create-nested-one-without-employees.input';

@InputType()
export class PositionEmployeeCreateWithoutEmployeeInput {
  @Field(() => PositionCreateNestedOneWithoutEmployeesInput, { nullable: false })
  position!: PositionCreateNestedOneWithoutEmployeesInput;
}
