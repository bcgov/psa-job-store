import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ClassificationOrderByWithRelationAndSearchRelevanceInput } from '../classification/classification-order-by-with-relation-and-search-relevance.input';
import { DepartmentOrderByWithRelationAndSearchRelevanceInput } from '../department/department-order-by-with-relation-and-search-relevance.input';
import { OrganizationOrderByWithRelationAndSearchRelevanceInput } from '../organization/organization-order-by-with-relation-and-search-relevance.input';
import { PositionEmployeeOrderByRelationAggregateInput } from '../position-employee/position-employee-order-by-relation-aggregate.input';
import { EmployeeOrderByRelevanceInput } from './employee-order-by-relevance.input';

@InputType()
export class EmployeeOrderByWithRelationAndSearchRelevanceInput {
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

  @Field(() => ClassificationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  classification?: ClassificationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => DepartmentOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  department?: DepartmentOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => OrganizationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  organization?: OrganizationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => PositionEmployeeOrderByRelationAggregateInput, { nullable: true })
  PositionEmployee?: PositionEmployeeOrderByRelationAggregateInput;

  @Field(() => EmployeeOrderByRelevanceInput, { nullable: true })
  _relevance?: EmployeeOrderByRelevanceInput;
}
