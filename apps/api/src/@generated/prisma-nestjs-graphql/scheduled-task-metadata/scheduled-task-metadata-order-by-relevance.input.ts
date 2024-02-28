import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ScheduledTaskMetadataOrderByRelevanceFieldEnum } from './scheduled-task-metadata-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ScheduledTaskMetadataOrderByRelevanceInput {
  @Field(() => [ScheduledTaskMetadataOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof ScheduledTaskMetadataOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
