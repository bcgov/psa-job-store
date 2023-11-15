import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { PositionCountOrderByAggregateInput } from './position-count-order-by-aggregate.input';
import { PositionMaxOrderByAggregateInput } from './position-max-order-by-aggregate.input';
import { PositionMinOrderByAggregateInput } from './position-min-order-by-aggregate.input';

@InputType()
export class PositionOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  department_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  organization_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  supervisor_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  job_profile_number?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  is_empty?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  is_vacant?: keyof typeof SortOrder;

  @Field(() => PositionCountOrderByAggregateInput, { nullable: true })
  _count?: PositionCountOrderByAggregateInput;

  @Field(() => PositionMaxOrderByAggregateInput, { nullable: true })
  _max?: PositionMaxOrderByAggregateInput;

  @Field(() => PositionMinOrderByAggregateInput, { nullable: true })
  _min?: PositionMinOrderByAggregateInput;
}
