import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { EmployeeCountOrderByAggregateInput } from './employee-count-order-by-aggregate.input';
import { EmployeeMaxOrderByAggregateInput } from './employee-max-order-by-aggregate.input';
import { EmployeeMinOrderByAggregateInput } from './employee-min-order-by-aggregate.input';

@InputType()
export class EmployeeOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  department_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  organization_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  status?: SortOrderInput;

  @Field(() => EmployeeCountOrderByAggregateInput, { nullable: true })
  _count?: EmployeeCountOrderByAggregateInput;

  @Field(() => EmployeeMaxOrderByAggregateInput, { nullable: true })
  _max?: EmployeeMaxOrderByAggregateInput;

  @Field(() => EmployeeMinOrderByAggregateInput, { nullable: true })
  _min?: EmployeeMinOrderByAggregateInput;
}
