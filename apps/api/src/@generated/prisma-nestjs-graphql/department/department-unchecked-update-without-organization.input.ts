import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestUncheckedUpdateManyWithoutDepartmentNestedInput } from '../position-request/position-request-unchecked-update-many-without-department-nested.input';

@InputType()
export class DepartmentUncheckedUpdateWithoutOrganizationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => PositionRequestUncheckedUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  PositionRequest?: PositionRequestUncheckedUpdateManyWithoutDepartmentNestedInput;
}
