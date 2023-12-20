import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PositionEmployeeCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  employee_id?: true;

  @Field(() => Boolean, { nullable: true })
  position_id?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
