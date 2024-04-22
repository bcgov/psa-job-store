import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { LocationCountAggregateInput } from './location-count-aggregate.input';
import { LocationMaxAggregateInput } from './location-max-aggregate.input';
import { LocationMinAggregateInput } from './location-min-aggregate.input';
import { LocationOrderByWithRelationAndSearchRelevanceInput } from './location-order-by-with-relation-and-search-relevance.input';
import { LocationWhereUniqueInput } from './location-where-unique.input';
import { LocationWhereInput } from './location-where.input';

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
