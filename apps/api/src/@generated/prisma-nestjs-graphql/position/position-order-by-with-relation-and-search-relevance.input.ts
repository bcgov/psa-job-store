import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ClassificationOrderByWithRelationAndSearchRelevanceInput } from '../classification/classification-order-by-with-relation-and-search-relevance.input';
import { DepartmentOrderByWithRelationAndSearchRelevanceInput } from '../department/department-order-by-with-relation-and-search-relevance.input';
import { OrganizationOrderByWithRelationAndSearchRelevanceInput } from '../organization/organization-order-by-with-relation-and-search-relevance.input';
import { PositionEmployeeOrderByRelationAggregateInput } from '../position-employee/position-employee-order-by-relation-aggregate.input';
import { PositionOrderByRelevanceInput } from './position-order-by-relevance.input';

@InputType()
export class PositionOrderByWithRelationAndSearchRelevanceInput {
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

  @Field(() => ClassificationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  classification?: ClassificationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => DepartmentOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  department?: DepartmentOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => OrganizationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  organization?: OrganizationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => PositionEmployeeOrderByRelationAggregateInput, { nullable: true })
  employees?: PositionEmployeeOrderByRelationAggregateInput;

  @Field(() => PositionOrderByRelevanceInput, { nullable: true })
  _relevance?: PositionOrderByRelevanceInput;
}
