import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { DepartmentOrderByRelationAggregateInput } from '../department/department-order-by-relation-aggregate.input';
import { PositionOrderByRelationAggregateInput } from '../position/position-order-by-relation-aggregate.input';
import { EmployeeOrderByRelationAggregateInput } from '../employee/employee-order-by-relation-aggregate.input';
import { OrganizationOrderByRelevanceInput } from './organization-order-by-relevance.input';

@InputType()
export class OrganizationOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => DepartmentOrderByRelationAggregateInput, { nullable: true })
  departments?: DepartmentOrderByRelationAggregateInput;

  @Field(() => PositionOrderByRelationAggregateInput, { nullable: true })
  positions?: PositionOrderByRelationAggregateInput;

  @Field(() => EmployeeOrderByRelationAggregateInput, { nullable: true })
  employees?: EmployeeOrderByRelationAggregateInput;

  @Field(() => OrganizationOrderByRelevanceInput, { nullable: true })
  _relevance?: OrganizationOrderByRelevanceInput;
}
