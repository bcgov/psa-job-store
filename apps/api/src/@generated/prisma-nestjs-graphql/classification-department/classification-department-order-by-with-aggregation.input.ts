import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ClassificationDepartmentCountOrderByAggregateInput } from './classification-department-count-order-by-aggregate.input';
import { ClassificationDepartmentMaxOrderByAggregateInput } from './classification-department-max-order-by-aggregate.input';
import { ClassificationDepartmentMinOrderByAggregateInput } from './classification-department-min-order-by-aggregate.input';

@InputType()
export class ClassificationDepartmentOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  department_id?: keyof typeof SortOrder;

  @Field(() => ClassificationDepartmentCountOrderByAggregateInput, { nullable: true })
  _count?: ClassificationDepartmentCountOrderByAggregateInput;

  @Field(() => ClassificationDepartmentMaxOrderByAggregateInput, { nullable: true })
  _max?: ClassificationDepartmentMaxOrderByAggregateInput;

  @Field(() => ClassificationDepartmentMinOrderByAggregateInput, { nullable: true })
  _min?: ClassificationDepartmentMinOrderByAggregateInput;
}
