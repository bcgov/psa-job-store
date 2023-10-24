import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ClassificationOrderByRelationAggregateInput } from '../classification/classification-order-by-relation-aggregate.input';
import { GridOrderByRelevanceInput } from './grid-order-by-relevance.input';

@InputType()
export class GridOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => ClassificationOrderByRelationAggregateInput, { nullable: true })
  classifications?: ClassificationOrderByRelationAggregateInput;

  @Field(() => GridOrderByRelevanceInput, { nullable: true })
  _relevance?: GridOrderByRelevanceInput;
}
