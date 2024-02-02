import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestUncheckedUpdateManyWithoutPaylist_departmentNestedInput } from '../position-request/position-request-unchecked-update-many-without-paylist-department-nested.input';

@InputType()
export class DepartmentUncheckedUpdateWithoutPositionRequestInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  location_id?: string;

  @Field(() => String, { nullable: true })
  organization_id?: string;

  @Field(() => String, { nullable: true })
  peoplesoft_id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  effective_status?: string;

  @Field(() => Date, { nullable: true })
  effective_date?: Date | string;

  @Field(() => PositionRequestUncheckedUpdateManyWithoutPaylist_departmentNestedInput, { nullable: true })
  PositionRequestsByPaylistDepartment?: PositionRequestUncheckedUpdateManyWithoutPaylist_departmentNestedInput;
}
