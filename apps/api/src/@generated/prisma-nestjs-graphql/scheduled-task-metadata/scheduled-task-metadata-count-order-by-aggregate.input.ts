import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ScheduledTaskMetadataCountOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  task?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  frequency?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  last_run_at?: keyof typeof SortOrder;
}
