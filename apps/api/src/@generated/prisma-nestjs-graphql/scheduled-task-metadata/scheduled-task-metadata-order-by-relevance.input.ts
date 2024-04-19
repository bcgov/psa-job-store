import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ScheduledTaskMetadataOrderByRelevanceFieldEnum } from './scheduled-task-metadata-order-by-relevance-field.enum';

@InputType()
export class ScheduledTaskMetadataOrderByRelevanceInput {
  @Field(() => [ScheduledTaskMetadataOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof ScheduledTaskMetadataOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
