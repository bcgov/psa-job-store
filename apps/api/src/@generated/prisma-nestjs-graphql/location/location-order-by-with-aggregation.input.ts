import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { LocationCountOrderByAggregateInput } from './location-count-order-by-aggregate.input';
import { LocationMaxOrderByAggregateInput } from './location-max-order-by-aggregate.input';
import { LocationMinOrderByAggregateInput } from './location-min-order-by-aggregate.input';

@InputType()
export class LocationOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  peoplesoft_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  code?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  effective_status?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  effective_date?: keyof typeof SortOrder;

  @Field(() => LocationCountOrderByAggregateInput, { nullable: true })
  _count?: LocationCountOrderByAggregateInput;

  @Field(() => LocationMaxOrderByAggregateInput, { nullable: true })
  _max?: LocationMaxOrderByAggregateInput;

  @Field(() => LocationMinOrderByAggregateInput, { nullable: true })
  _min?: LocationMinOrderByAggregateInput;
}
