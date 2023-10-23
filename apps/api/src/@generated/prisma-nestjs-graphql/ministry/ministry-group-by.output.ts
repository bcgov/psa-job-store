import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { MinistryCountAggregate } from './ministry-count-aggregate.output';
import { MinistryAvgAggregate } from './ministry-avg-aggregate.output';
import { MinistrySumAggregate } from './ministry-sum-aggregate.output';
import { MinistryMinAggregate } from './ministry-min-aggregate.output';
import { MinistryMaxAggregate } from './ministry-max-aggregate.output';

@ObjectType()
export class MinistryGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

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
