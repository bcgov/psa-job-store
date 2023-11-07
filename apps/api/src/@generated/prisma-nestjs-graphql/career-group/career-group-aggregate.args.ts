import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CareerGroupWhereInput } from './career-group-where.input';
import { Type } from 'class-transformer';
import { CareerGroupOrderByWithRelationAndSearchRelevanceInput } from './career-group-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { CareerGroupWhereUniqueInput } from './career-group-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CareerGroupCountAggregateInput } from './career-group-count-aggregate.input';
import { CareerGroupAvgAggregateInput } from './career-group-avg-aggregate.input';
import { CareerGroupSumAggregateInput } from './career-group-sum-aggregate.input';
import { CareerGroupMinAggregateInput } from './career-group-min-aggregate.input';
import { CareerGroupMaxAggregateInput } from './career-group-max-aggregate.input';

@ArgsType()
export class CareerGroupAggregateArgs {
  @Field(() => CareerGroupWhereInput, { nullable: true })
  @Type(() => CareerGroupWhereInput)
  where?: CareerGroupWhereInput;

  @Field(() => [CareerGroupOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<CareerGroupOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => CareerGroupWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<CareerGroupWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => CareerGroupCountAggregateInput, { nullable: true })
  _count?: CareerGroupCountAggregateInput;

  @Field(() => CareerGroupAvgAggregateInput, { nullable: true })
  _avg?: CareerGroupAvgAggregateInput;

  @Field(() => CareerGroupSumAggregateInput, { nullable: true })
  _sum?: CareerGroupSumAggregateInput;

  @Field(() => CareerGroupMinAggregateInput, { nullable: true })
  _min?: CareerGroupMinAggregateInput;

  @Field(() => CareerGroupMaxAggregateInput, { nullable: true })
  _max?: CareerGroupMaxAggregateInput;
}
