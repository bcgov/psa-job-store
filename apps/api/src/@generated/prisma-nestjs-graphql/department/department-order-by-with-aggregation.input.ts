import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { DepartmentCountOrderByAggregateInput } from './department-count-order-by-aggregate.input';
import { DepartmentMaxOrderByAggregateInput } from './department-max-order-by-aggregate.input';
import { DepartmentMinOrderByAggregateInput } from './department-min-order-by-aggregate.input';

@InputType()
export class DepartmentOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  location_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  organization_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  peoplesoft_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  code?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  effective_status?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  effective_date?: keyof typeof SortOrder;

  @Field(() => DepartmentCountOrderByAggregateInput, { nullable: true })
  _count?: DepartmentCountOrderByAggregateInput;

  @Field(() => DepartmentMaxOrderByAggregateInput, { nullable: true })
  _max?: DepartmentMaxOrderByAggregateInput;

  @Field(() => DepartmentMinOrderByAggregateInput, { nullable: true })
  _min?: DepartmentMinOrderByAggregateInput;
}
