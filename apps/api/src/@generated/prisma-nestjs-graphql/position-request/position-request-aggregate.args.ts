import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionRequestWhereInput } from './position-request-where.input';
import { Type } from 'class-transformer';
import { PositionRequestOrderByWithRelationAndSearchRelevanceInput } from './position-request-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { Int } from '@nestjs/graphql';
import { PositionRequestCountAggregateInput } from './position-request-count-aggregate.input';
import { PositionRequestAvgAggregateInput } from './position-request-avg-aggregate.input';
import { PositionRequestSumAggregateInput } from './position-request-sum-aggregate.input';
import { PositionRequestMinAggregateInput } from './position-request-min-aggregate.input';
import { PositionRequestMaxAggregateInput } from './position-request-max-aggregate.input';

@ArgsType()
export class PositionRequestAggregateArgs {
  @Field(() => PositionRequestWhereInput, { nullable: true })
  @Type(() => PositionRequestWhereInput)
  where?: PositionRequestWhereInput;

  @Field(() => [PositionRequestOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<PositionRequestOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => PositionRequestWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => PositionRequestCountAggregateInput, { nullable: true })
  _count?: PositionRequestCountAggregateInput;

  @Field(() => PositionRequestAvgAggregateInput, { nullable: true })
  _avg?: PositionRequestAvgAggregateInput;

  @Field(() => PositionRequestSumAggregateInput, { nullable: true })
  _sum?: PositionRequestSumAggregateInput;

  @Field(() => PositionRequestMinAggregateInput, { nullable: true })
  _min?: PositionRequestMinAggregateInput;

  @Field(() => PositionRequestMaxAggregateInput, { nullable: true })
  _max?: PositionRequestMaxAggregateInput;
}
