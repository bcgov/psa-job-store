import { Field, InputType } from '@nestjs/graphql';
import { PositionRequestUncheckedUpdateManyWithoutWorkLocationNestedInput } from '../position-request/position-request-unchecked-update-many-without-work-location-nested.input';

@InputType()
export class LocationUncheckedUpdateWithoutDepartmentsInput {
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

  @Field(() => PositionRequestUncheckedUpdateManyWithoutWorkLocationNestedInput, { nullable: true })
  positionRequests?: PositionRequestUncheckedUpdateManyWithoutWorkLocationNestedInput;
}
