import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { IdentityCountOrderByAggregateInput } from './identity-count-order-by-aggregate.input';
import { IdentityMaxOrderByAggregateInput } from './identity-max-order-by-aggregate.input';
import { IdentityMinOrderByAggregateInput } from './identity-min-order-by-aggregate.input';

@InputType()
export class IdentityOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  sub?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  identity_provider?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  user_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  created_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_at?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  deleted_at?: SortOrderInput;

  @Field(() => IdentityCountOrderByAggregateInput, { nullable: true })
  _count?: IdentityCountOrderByAggregateInput;

  @Field(() => IdentityMaxOrderByAggregateInput, { nullable: true })
  _max?: IdentityMaxOrderByAggregateInput;

  @Field(() => IdentityMinOrderByAggregateInput, { nullable: true })
  _min?: IdentityMinOrderByAggregateInput;
}
