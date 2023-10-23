import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { OccupationGroupCountOrderByAggregateInput } from './occupation-group-count-order-by-aggregate.input';
import { OccupationGroupAvgOrderByAggregateInput } from './occupation-group-avg-order-by-aggregate.input';
import { OccupationGroupMaxOrderByAggregateInput } from './occupation-group-max-order-by-aggregate.input';
import { OccupationGroupMinOrderByAggregateInput } from './occupation-group-min-order-by-aggregate.input';
import { OccupationGroupSumOrderByAggregateInput } from './occupation-group-sum-order-by-aggregate.input';

@InputType()
export class OccupationGroupOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  code?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => OccupationGroupCountOrderByAggregateInput, { nullable: true })
  _count?: OccupationGroupCountOrderByAggregateInput;

  @Field(() => OccupationGroupAvgOrderByAggregateInput, { nullable: true })
  _avg?: OccupationGroupAvgOrderByAggregateInput;

  @Field(() => OccupationGroupMaxOrderByAggregateInput, { nullable: true })
  _max?: OccupationGroupMaxOrderByAggregateInput;

  @Field(() => OccupationGroupMinOrderByAggregateInput, { nullable: true })
  _min?: OccupationGroupMinOrderByAggregateInput;

  @Field(() => OccupationGroupSumOrderByAggregateInput, { nullable: true })
  _sum?: OccupationGroupSumOrderByAggregateInput;
}
