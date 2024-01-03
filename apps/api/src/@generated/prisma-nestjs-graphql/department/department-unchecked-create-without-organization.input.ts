import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestUncheckedCreateNestedManyWithoutDepartmentInput } from '../position-request/position-request-unchecked-create-nested-many-without-department.input';

@InputType()
export class DepartmentUncheckedCreateWithoutOrganizationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => PositionRequestUncheckedCreateNestedManyWithoutDepartmentInput, { nullable: true })
  PositionRequest?: PositionRequestUncheckedCreateNestedManyWithoutDepartmentInput;
}
