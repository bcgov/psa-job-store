import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CareerGroupCountOrderByAggregateInput } from './career-group-count-order-by-aggregate.input';
import { CareerGroupAvgOrderByAggregateInput } from './career-group-avg-order-by-aggregate.input';
import { CareerGroupMaxOrderByAggregateInput } from './career-group-max-order-by-aggregate.input';
import { CareerGroupMinOrderByAggregateInput } from './career-group-min-order-by-aggregate.input';
import { CareerGroupSumOrderByAggregateInput } from './career-group-sum-order-by-aggregate.input';

@InputType()
export class CareerGroupOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => CareerGroupCountOrderByAggregateInput, { nullable: true })
  _count?: CareerGroupCountOrderByAggregateInput;

  @Field(() => CareerGroupAvgOrderByAggregateInput, { nullable: true })
  _avg?: CareerGroupAvgOrderByAggregateInput;

  @Field(() => CareerGroupMaxOrderByAggregateInput, { nullable: true })
  _max?: CareerGroupMaxOrderByAggregateInput;

  @Field(() => CareerGroupMinOrderByAggregateInput, { nullable: true })
  _min?: CareerGroupMinOrderByAggregateInput;

  @Field(() => CareerGroupSumOrderByAggregateInput, { nullable: true })
  _sum?: CareerGroupSumOrderByAggregateInput;
}
