import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LocationWhereInput } from './location-where.input';
import { Type } from 'class-transformer';
import { LocationOrderByWithRelationAndSearchRelevanceInput } from './location-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { LocationWhereUniqueInput } from './location-where-unique.input';
import { Int } from '@nestjs/graphql';
import { LocationCountAggregateInput } from './location-count-aggregate.input';
import { LocationMinAggregateInput } from './location-min-aggregate.input';
import { LocationMaxAggregateInput } from './location-max-aggregate.input';

@ArgsType()
export class LocationAggregateArgs {
  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;

  @Field(() => [LocationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<LocationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => LocationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => LocationCountAggregateInput, { nullable: true })
  _count?: LocationCountAggregateInput;

  @Field(() => LocationMinAggregateInput, { nullable: true })
  _min?: LocationMinAggregateInput;

  @Field(() => LocationMaxAggregateInput, { nullable: true })
  _max?: LocationMaxAggregateInput;
}
