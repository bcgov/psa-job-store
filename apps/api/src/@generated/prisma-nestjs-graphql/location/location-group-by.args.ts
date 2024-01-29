import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LocationWhereInput } from './location-where.input';
import { Type } from 'class-transformer';
import { LocationOrderByWithAggregationInput } from './location-order-by-with-aggregation.input';
import { LocationScalarFieldEnum } from './location-scalar-field.enum';
import { LocationScalarWhereWithAggregatesInput } from './location-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { LocationCountAggregateInput } from './location-count-aggregate.input';
import { LocationMinAggregateInput } from './location-min-aggregate.input';
import { LocationMaxAggregateInput } from './location-max-aggregate.input';

@ArgsType()
export class LocationGroupByArgs {
  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;

  @Field(() => [LocationOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<LocationOrderByWithAggregationInput>;

  @Field(() => [LocationScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof LocationScalarFieldEnum>;

  @Field(() => LocationScalarWhereWithAggregatesInput, { nullable: true })
  having?: LocationScalarWhereWithAggregatesInput;

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
