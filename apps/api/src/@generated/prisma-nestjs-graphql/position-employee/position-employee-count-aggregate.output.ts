import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class PositionEmployeeCountAggregate {
  @Field(() => Int, { nullable: false })
  employee_id!: number;

  @Field(() => Int, { nullable: false })
  position_id!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
