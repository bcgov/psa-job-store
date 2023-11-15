import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionUncheckedUpdateManyWithoutDepartmentNestedInput } from '../position/position-unchecked-update-many-without-department-nested.input';

@InputType()
export class DepartmentUncheckedUpdateWithoutEmployeeInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  organization_id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => PositionUncheckedUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  Position?: PositionUncheckedUpdateManyWithoutDepartmentNestedInput;
}
