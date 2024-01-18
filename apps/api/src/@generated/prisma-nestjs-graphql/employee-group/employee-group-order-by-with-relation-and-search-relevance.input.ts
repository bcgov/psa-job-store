import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ClassificationOrderByRelationAggregateInput } from '../classification/classification-order-by-relation-aggregate.input';
import { EmployeeGroupOrderByRelevanceInput } from './employee-group-order-by-relevance.input';

@InputType()
export class EmployeeGroupOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => ClassificationOrderByRelationAggregateInput, { nullable: true })
  classifications?: ClassificationOrderByRelationAggregateInput;

  @Field(() => EmployeeGroupOrderByRelevanceInput, { nullable: true })
  _relevance?: EmployeeGroupOrderByRelevanceInput;
}
