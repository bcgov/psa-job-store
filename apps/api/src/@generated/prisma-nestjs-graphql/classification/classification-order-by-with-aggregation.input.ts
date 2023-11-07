import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ClassificationCountOrderByAggregateInput } from './classification-count-order-by-aggregate.input';
import { ClassificationAvgOrderByAggregateInput } from './classification-avg-order-by-aggregate.input';
import { ClassificationMaxOrderByAggregateInput } from './classification-max-order-by-aggregate.input';
import { ClassificationMinOrderByAggregateInput } from './classification-min-order-by-aggregate.input';
import { ClassificationSumOrderByAggregateInput } from './classification-sum-order-by-aggregate.input';

@InputType()
export class ClassificationOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  grid_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  occupation_group_id?: keyof typeof SortOrder;

  @Field(() => ClassificationCountOrderByAggregateInput, { nullable: true })
  _count?: ClassificationCountOrderByAggregateInput;

  @Field(() => ClassificationAvgOrderByAggregateInput, { nullable: true })
  _avg?: ClassificationAvgOrderByAggregateInput;

  @Field(() => ClassificationMaxOrderByAggregateInput, { nullable: true })
  _max?: ClassificationMaxOrderByAggregateInput;

  @Field(() => ClassificationMinOrderByAggregateInput, { nullable: true })
  _min?: ClassificationMinOrderByAggregateInput;

  @Field(() => ClassificationSumOrderByAggregateInput, { nullable: true })
  _sum?: ClassificationSumOrderByAggregateInput;
}
