import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GridCountAggregate } from './grid-count-aggregate.output';
import { GridAvgAggregate } from './grid-avg-aggregate.output';
import { GridSumAggregate } from './grid-sum-aggregate.output';
import { GridMinAggregate } from './grid-min-aggregate.output';
import { GridMaxAggregate } from './grid-max-aggregate.output';

@ObjectType()
export class GridGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => GridCountAggregate, { nullable: true })
  _count?: GridCountAggregate;

  @Field(() => GridAvgAggregate, { nullable: true })
  _avg?: GridAvgAggregate;

  @Field(() => GridSumAggregate, { nullable: true })
  _sum?: GridSumAggregate;

  @Field(() => GridMinAggregate, { nullable: true })
  _min?: GridMinAggregate;

  @Field(() => GridMaxAggregate, { nullable: true })
  _max?: GridMaxAggregate;
}
