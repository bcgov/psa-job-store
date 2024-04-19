import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ScheduledTaskMetadataSumOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  frequency?: keyof typeof SortOrder;
}
