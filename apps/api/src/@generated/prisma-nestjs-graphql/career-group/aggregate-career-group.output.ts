import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CareerGroupCountAggregate } from './career-group-count-aggregate.output';
import { CareerGroupAvgAggregate } from './career-group-avg-aggregate.output';
import { CareerGroupSumAggregate } from './career-group-sum-aggregate.output';
import { CareerGroupMinAggregate } from './career-group-min-aggregate.output';
import { CareerGroupMaxAggregate } from './career-group-max-aggregate.output';

@ObjectType()
export class AggregateCareerGroup {
  @Field(() => CareerGroupCountAggregate, { nullable: true })
  _count?: CareerGroupCountAggregate;

  @Field(() => CareerGroupAvgAggregate, { nullable: true })
  _avg?: CareerGroupAvgAggregate;

  @Field(() => CareerGroupSumAggregate, { nullable: true })
  _sum?: CareerGroupSumAggregate;

  @Field(() => CareerGroupMinAggregate, { nullable: true })
  _min?: CareerGroupMinAggregate;

  @Field(() => CareerGroupMaxAggregate, { nullable: true })
  _max?: CareerGroupMaxAggregate;
}
