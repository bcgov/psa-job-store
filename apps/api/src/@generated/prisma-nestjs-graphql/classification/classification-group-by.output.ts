import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ClassificationCountAggregate } from './classification-count-aggregate.output';
import { ClassificationAvgAggregate } from './classification-avg-aggregate.output';
import { ClassificationSumAggregate } from './classification-sum-aggregate.output';
import { ClassificationMinAggregate } from './classification-min-aggregate.output';
import { ClassificationMaxAggregate } from './classification-max-aggregate.output';

@ObjectType()
export class ClassificationGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  grid_id!: number;

  @Field(() => Int, { nullable: false })
  occupation_group_id!: number;

  @Field(() => ClassificationCountAggregate, { nullable: true })
  _count?: ClassificationCountAggregate;

  @Field(() => ClassificationAvgAggregate, { nullable: true })
  _avg?: ClassificationAvgAggregate;

  @Field(() => ClassificationSumAggregate, { nullable: true })
  _sum?: ClassificationSumAggregate;

  @Field(() => ClassificationMinAggregate, { nullable: true })
  _min?: ClassificationMinAggregate;

  @Field(() => ClassificationMaxAggregate, { nullable: true })
  _max?: ClassificationMaxAggregate;
}
