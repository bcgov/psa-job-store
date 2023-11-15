import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { EmployeeOrderByWithRelationAndSearchRelevanceInput } from '../employee/employee-order-by-with-relation-and-search-relevance.input';
import { PositionOrderByWithRelationAndSearchRelevanceInput } from '../position/position-order-by-with-relation-and-search-relevance.input';
import { PositionEmployeeOrderByRelevanceInput } from './position-employee-order-by-relevance.input';

@InputType()
export class PositionEmployeeOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  employee_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  position_id?: keyof typeof SortOrder;

  @Field(() => EmployeeOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  employee?: EmployeeOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => PositionOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  position?: PositionOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => PositionEmployeeOrderByRelevanceInput, { nullable: true })
  _relevance?: PositionEmployeeOrderByRelevanceInput;
}
