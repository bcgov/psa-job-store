import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ScheduledTaskMetadataAvgOrderByAggregateInput } from './scheduled-task-metadata-avg-order-by-aggregate.input';
import { ScheduledTaskMetadataCountOrderByAggregateInput } from './scheduled-task-metadata-count-order-by-aggregate.input';
import { ScheduledTaskMetadataMaxOrderByAggregateInput } from './scheduled-task-metadata-max-order-by-aggregate.input';
import { ScheduledTaskMetadataMinOrderByAggregateInput } from './scheduled-task-metadata-min-order-by-aggregate.input';
import { ScheduledTaskMetadataSumOrderByAggregateInput } from './scheduled-task-metadata-sum-order-by-aggregate.input';

@InputType()
export class ScheduledTaskMetadataOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  task?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  frequency?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  last_run_at?: SortOrderInput;

  @Field(() => ScheduledTaskMetadataCountOrderByAggregateInput, { nullable: true })
  _count?: ScheduledTaskMetadataCountOrderByAggregateInput;

  @Field(() => ScheduledTaskMetadataAvgOrderByAggregateInput, { nullable: true })
  _avg?: ScheduledTaskMetadataAvgOrderByAggregateInput;

  @Field(() => ScheduledTaskMetadataMaxOrderByAggregateInput, { nullable: true })
  _max?: ScheduledTaskMetadataMaxOrderByAggregateInput;

  @Field(() => ScheduledTaskMetadataMinOrderByAggregateInput, { nullable: true })
  _min?: ScheduledTaskMetadataMinOrderByAggregateInput;

  @Field(() => ScheduledTaskMetadataSumOrderByAggregateInput, { nullable: true })
  _sum?: ScheduledTaskMetadataSumOrderByAggregateInput;
}
