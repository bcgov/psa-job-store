import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { PositionEmployeeCountOrderByAggregateInput } from './position-employee-count-order-by-aggregate.input';
import { PositionEmployeeMaxOrderByAggregateInput } from './position-employee-max-order-by-aggregate.input';
import { PositionEmployeeMinOrderByAggregateInput } from './position-employee-min-order-by-aggregate.input';

@InputType()
export class PositionEmployeeOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  employee_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  position_id?: keyof typeof SortOrder;

  @Field(() => PositionEmployeeCountOrderByAggregateInput, { nullable: true })
  _count?: PositionEmployeeCountOrderByAggregateInput;

  @Field(() => PositionEmployeeMaxOrderByAggregateInput, { nullable: true })
  _max?: PositionEmployeeMaxOrderByAggregateInput;

  @Field(() => PositionEmployeeMinOrderByAggregateInput, { nullable: true })
  _min?: PositionEmployeeMinOrderByAggregateInput;
}
