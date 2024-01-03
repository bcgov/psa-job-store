import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestUpdateManyWithoutDepartmentNestedInput } from '../position-request/position-request-update-many-without-department-nested.input';

@InputType()
export class DepartmentUpdateWithoutOrganizationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => PositionRequestUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  PositionRequest?: PositionRequestUpdateManyWithoutDepartmentNestedInput;
}
