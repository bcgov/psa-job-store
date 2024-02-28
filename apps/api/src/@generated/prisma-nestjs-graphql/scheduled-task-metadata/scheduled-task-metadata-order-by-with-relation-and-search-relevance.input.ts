import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ScheduledTaskMetadataOrderByRelevanceInput } from './scheduled-task-metadata-order-by-relevance.input';

@InputType()
export class ScheduledTaskMetadataOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  task?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  frequency?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  last_run_at?: SortOrderInput;

  @Field(() => ScheduledTaskMetadataOrderByRelevanceInput, { nullable: true })
  _relevance?: ScheduledTaskMetadataOrderByRelevanceInput;
}
