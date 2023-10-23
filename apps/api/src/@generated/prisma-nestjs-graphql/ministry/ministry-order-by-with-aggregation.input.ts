import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { MinistryCountOrderByAggregateInput } from './ministry-count-order-by-aggregate.input';
import { MinistryAvgOrderByAggregateInput } from './ministry-avg-order-by-aggregate.input';
import { MinistryMaxOrderByAggregateInput } from './ministry-max-order-by-aggregate.input';
import { MinistryMinOrderByAggregateInput } from './ministry-min-order-by-aggregate.input';
import { MinistrySumOrderByAggregateInput } from './ministry-sum-order-by-aggregate.input';

@InputType()
export class MinistryOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  code?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => MinistryCountOrderByAggregateInput, { nullable: true })
  _count?: MinistryCountOrderByAggregateInput;

  @Field(() => MinistryAvgOrderByAggregateInput, { nullable: true })
  _avg?: MinistryAvgOrderByAggregateInput;

  @Field(() => MinistryMaxOrderByAggregateInput, { nullable: true })
  _max?: MinistryMaxOrderByAggregateInput;

  @Field(() => MinistryMinOrderByAggregateInput, { nullable: true })
  _min?: MinistryMinOrderByAggregateInput;

  @Field(() => MinistrySumOrderByAggregateInput, { nullable: true })
  _sum?: MinistrySumOrderByAggregateInput;
}
