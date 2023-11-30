import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { PositionEmployeeCountAggregate } from './position-employee-count-aggregate.output';
import { PositionEmployeeMinAggregate } from './position-employee-min-aggregate.output';
import { PositionEmployeeMaxAggregate } from './position-employee-max-aggregate.output';

@ObjectType()
export class AggregatePositionEmployee {
  @Field(() => PositionEmployeeCountAggregate, { nullable: true })
  _count?: PositionEmployeeCountAggregate;

  @Field(() => PositionEmployeeMinAggregate, { nullable: true })
  _min?: PositionEmployeeMinAggregate;

  @Field(() => PositionEmployeeMaxAggregate, { nullable: true })
  _max?: PositionEmployeeMaxAggregate;
}
