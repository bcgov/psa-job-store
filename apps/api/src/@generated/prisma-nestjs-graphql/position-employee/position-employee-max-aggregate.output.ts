import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PositionEmployeeMaxAggregate {
  @Field(() => String, { nullable: true })
  employee_id?: string;

  @Field(() => String, { nullable: true })
  position_id?: string;
}
