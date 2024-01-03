import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateNestedManyWithoutDepartmentInput } from '../position-request/position-request-create-nested-many-without-department.input';

@InputType()
export class DepartmentCreateWithoutOrganizationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => PositionRequestCreateNestedManyWithoutDepartmentInput, { nullable: true })
  PositionRequest?: PositionRequestCreateNestedManyWithoutDepartmentInput;
}
