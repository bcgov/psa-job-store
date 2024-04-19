import { Field, ObjectType } from '@nestjs/graphql';
import { PositionRequestAvgAggregate } from './position-request-avg-aggregate.output';
import { PositionRequestCountAggregate } from './position-request-count-aggregate.output';
import { PositionRequestMaxAggregate } from './position-request-max-aggregate.output';
import { PositionRequestMinAggregate } from './position-request-min-aggregate.output';
import { PositionRequestSumAggregate } from './position-request-sum-aggregate.output';

@ObjectType()
export class AggregatePositionRequest {
  @Field(() => PositionRequestCountAggregate, { nullable: true })
  _count?: PositionRequestCountAggregate;

  @Field(() => PositionRequestAvgAggregate, { nullable: true })
  _avg?: PositionRequestAvgAggregate;

  @Field(() => PositionRequestSumAggregate, { nullable: true })
  _sum?: PositionRequestSumAggregate;

  @Field(() => PositionRequestMinAggregate, { nullable: true })
  _min?: PositionRequestMinAggregate;

  @Field(() => PositionRequestMaxAggregate, { nullable: true })
  _max?: PositionRequestMaxAggregate;
}
