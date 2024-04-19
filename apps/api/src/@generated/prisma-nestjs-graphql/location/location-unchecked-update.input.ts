import { Field, InputType } from '@nestjs/graphql';
import { DepartmentUncheckedUpdateManyWithoutLocationNestedInput } from '../department/department-unchecked-update-many-without-location-nested.input';
import { PositionRequestUncheckedUpdateManyWithoutWorkLocationNestedInput } from '../position-request/position-request-unchecked-update-many-without-work-location-nested.input';

@InputType()
export class LocationUncheckedUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

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

  @Field(() => DepartmentUncheckedUpdateManyWithoutLocationNestedInput, { nullable: true })
  departments?: DepartmentUncheckedUpdateManyWithoutLocationNestedInput;

  @Field(() => PositionRequestUncheckedUpdateManyWithoutWorkLocationNestedInput, { nullable: true })
  positionRequests?: PositionRequestUncheckedUpdateManyWithoutWorkLocationNestedInput;
}
