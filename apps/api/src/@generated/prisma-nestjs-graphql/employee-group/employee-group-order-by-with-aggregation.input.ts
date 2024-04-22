import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { EmployeeGroupCountOrderByAggregateInput } from './employee-group-count-order-by-aggregate.input';
import { EmployeeGroupMaxOrderByAggregateInput } from './employee-group-max-order-by-aggregate.input';
import { EmployeeGroupMinOrderByAggregateInput } from './employee-group-min-order-by-aggregate.input';

@InputType()
export class EmployeeGroupOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => EmployeeGroupCountOrderByAggregateInput, { nullable: true })
  _count?: EmployeeGroupCountOrderByAggregateInput;

  @Field(() => EmployeeGroupMaxOrderByAggregateInput, { nullable: true })
  _max?: EmployeeGroupMaxOrderByAggregateInput;

  @Field(() => EmployeeGroupMinOrderByAggregateInput, { nullable: true })
  _min?: EmployeeGroupMinOrderByAggregateInput;
}
