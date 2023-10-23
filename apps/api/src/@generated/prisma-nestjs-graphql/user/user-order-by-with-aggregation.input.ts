import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UserCountOrderByAggregateInput } from './user-count-order-by-aggregate.input';
import { UserMaxOrderByAggregateInput } from './user-max-order-by-aggregate.input';
import { UserMinOrderByAggregateInput } from './user-min-order-by-aggregate.input';

@InputType()
export class UserOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  name?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  email?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  roles?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  created_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_at?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  deleted_at?: SortOrderInput;

  @Field(() => UserCountOrderByAggregateInput, { nullable: true })
  _count?: UserCountOrderByAggregateInput;

  @Field(() => UserMaxOrderByAggregateInput, { nullable: true })
  _max?: UserMaxOrderByAggregateInput;

  @Field(() => UserMinOrderByAggregateInput, { nullable: true })
  _min?: UserMinOrderByAggregateInput;
}
