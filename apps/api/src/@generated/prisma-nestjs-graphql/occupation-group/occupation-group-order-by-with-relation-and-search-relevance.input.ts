import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ClassificationOrderByRelationAggregateInput } from '../classification/classification-order-by-relation-aggregate.input';
import { OccupationGroupOrderByRelevanceInput } from './occupation-group-order-by-relevance.input';

@InputType()
export class OccupationGroupOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  code?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => ClassificationOrderByRelationAggregateInput, { nullable: true })
  classifications?: ClassificationOrderByRelationAggregateInput;

  @Field(() => OccupationGroupOrderByRelevanceInput, { nullable: true })
  _relevance?: OccupationGroupOrderByRelevanceInput;
}
