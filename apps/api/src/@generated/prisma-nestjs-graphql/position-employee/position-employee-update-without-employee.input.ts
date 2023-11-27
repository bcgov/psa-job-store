import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionUpdateOneRequiredWithoutEmployeesNestedInput } from '../position/position-update-one-required-without-employees-nested.input';

@InputType()
export class PositionEmployeeUpdateWithoutEmployeeInput {
  @Field(() => PositionUpdateOneRequiredWithoutEmployeesNestedInput, { nullable: true })
  position?: PositionUpdateOneRequiredWithoutEmployeesNestedInput;
}
