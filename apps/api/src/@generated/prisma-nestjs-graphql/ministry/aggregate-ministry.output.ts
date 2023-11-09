import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { MinistryCountAggregate } from './ministry-count-aggregate.output';
import { MinistryAvgAggregate } from './ministry-avg-aggregate.output';
import { MinistrySumAggregate } from './ministry-sum-aggregate.output';
import { MinistryMinAggregate } from './ministry-min-aggregate.output';
import { MinistryMaxAggregate } from './ministry-max-aggregate.output';

@ObjectType()
export class AggregateMinistry {
  @Field(() => MinistryCountAggregate, { nullable: true })
  _count?: MinistryCountAggregate;

  @Field(() => MinistryAvgAggregate, { nullable: true })
  _avg?: MinistryAvgAggregate;

  @Field(() => MinistrySumAggregate, { nullable: true })
  _sum?: MinistrySumAggregate;

  @Field(() => MinistryMinAggregate, { nullable: true })
  _min?: MinistryMinAggregate;

  @Field(() => MinistryMaxAggregate, { nullable: true })
  _max?: MinistryMaxAggregate;
}
