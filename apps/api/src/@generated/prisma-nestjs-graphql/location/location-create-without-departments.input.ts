import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateNestedManyWithoutWorkLocationInput } from '../position-request/position-request-create-nested-many-without-work-location.input';

@InputType()
export class LocationCreateWithoutDepartmentsInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date | string;

  @Field(() => PositionRequestCreateNestedManyWithoutWorkLocationInput, { nullable: true })
  positionRequests?: PositionRequestCreateNestedManyWithoutWorkLocationInput;
}
