import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { GridCountOrderByAggregateInput } from './grid-count-order-by-aggregate.input';
import { GridAvgOrderByAggregateInput } from './grid-avg-order-by-aggregate.input';
import { GridMaxOrderByAggregateInput } from './grid-max-order-by-aggregate.input';
import { GridMinOrderByAggregateInput } from './grid-min-order-by-aggregate.input';
import { GridSumOrderByAggregateInput } from './grid-sum-order-by-aggregate.input';

@InputType()
export class GridOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  steps?: keyof typeof SortOrder;

  @Field(() => GridCountOrderByAggregateInput, { nullable: true })
  _count?: GridCountOrderByAggregateInput;

  @Field(() => GridAvgOrderByAggregateInput, { nullable: true })
  _avg?: GridAvgOrderByAggregateInput;

  @Field(() => GridMaxOrderByAggregateInput, { nullable: true })
  _max?: GridMaxOrderByAggregateInput;

  @Field(() => GridMinOrderByAggregateInput, { nullable: true })
  _min?: GridMinOrderByAggregateInput;

  @Field(() => GridSumOrderByAggregateInput, { nullable: true })
  _sum?: GridSumOrderByAggregateInput;
}
