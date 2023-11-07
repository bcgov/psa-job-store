import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GridWhereInput } from './grid-where.input';
import { Type } from 'class-transformer';
import { GridOrderByWithRelationAndSearchRelevanceInput } from './grid-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { GridWhereUniqueInput } from './grid-where-unique.input';
import { Int } from '@nestjs/graphql';
import { GridCountAggregateInput } from './grid-count-aggregate.input';
import { GridAvgAggregateInput } from './grid-avg-aggregate.input';
import { GridSumAggregateInput } from './grid-sum-aggregate.input';
import { GridMinAggregateInput } from './grid-min-aggregate.input';
import { GridMaxAggregateInput } from './grid-max-aggregate.input';

@ArgsType()
export class GridAggregateArgs {
  @Field(() => GridWhereInput, { nullable: true })
  @Type(() => GridWhereInput)
  where?: GridWhereInput;

  @Field(() => [GridOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<GridOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => GridWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<GridWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => GridCountAggregateInput, { nullable: true })
  _count?: GridCountAggregateInput;

  @Field(() => GridAvgAggregateInput, { nullable: true })
  _avg?: GridAvgAggregateInput;

  @Field(() => GridSumAggregateInput, { nullable: true })
  _sum?: GridSumAggregateInput;

  @Field(() => GridMinAggregateInput, { nullable: true })
  _min?: GridMinAggregateInput;

  @Field(() => GridMaxAggregateInput, { nullable: true })
  _max?: GridMaxAggregateInput;
}
