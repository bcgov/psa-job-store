import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { OrganizationOrderByWithRelationAndSearchRelevanceInput } from '../organization/organization-order-by-with-relation-and-search-relevance.input';
import { PositionOrderByRelationAggregateInput } from '../position/position-order-by-relation-aggregate.input';
import { EmployeeOrderByRelationAggregateInput } from '../employee/employee-order-by-relation-aggregate.input';
import { DepartmentOrderByRelevanceInput } from './department-order-by-relevance.input';

@InputType()
export class DepartmentOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  organization_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => OrganizationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  organization?: OrganizationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => PositionOrderByRelationAggregateInput, { nullable: true })
  Position?: PositionOrderByRelationAggregateInput;

  @Field(() => EmployeeOrderByRelationAggregateInput, { nullable: true })
  Employee?: EmployeeOrderByRelationAggregateInput;

  @Field(() => DepartmentOrderByRelevanceInput, { nullable: true })
  _relevance?: DepartmentOrderByRelevanceInput;
}
