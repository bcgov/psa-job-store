import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ProfessionalDesignationOrderByRelationAggregateInput } from '../professional-designation/professional-designation-order-by-relation-aggregate.input';
import { EmployeeGroupOrderByRelevanceInput } from './employee-group-order-by-relevance.input';

@InputType()
export class EmployeeGroupOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => ProfessionalDesignationOrderByRelationAggregateInput, { nullable: true })
  professional_designations?: ProfessionalDesignationOrderByRelationAggregateInput;

  @Field(() => EmployeeGroupOrderByRelevanceInput, { nullable: true })
  _relevance?: EmployeeGroupOrderByRelevanceInput;
}
