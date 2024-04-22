import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ScheduledTaskMetadataAvgAggregateInput } from './scheduled-task-metadata-avg-aggregate.input';
import { ScheduledTaskMetadataCountAggregateInput } from './scheduled-task-metadata-count-aggregate.input';
import { ScheduledTaskMetadataMaxAggregateInput } from './scheduled-task-metadata-max-aggregate.input';
import { ScheduledTaskMetadataMinAggregateInput } from './scheduled-task-metadata-min-aggregate.input';
import { ScheduledTaskMetadataOrderByWithAggregationInput } from './scheduled-task-metadata-order-by-with-aggregation.input';
import { ScheduledTaskMetadataScalarFieldEnum } from './scheduled-task-metadata-scalar-field.enum';
import { ScheduledTaskMetadataScalarWhereWithAggregatesInput } from './scheduled-task-metadata-scalar-where-with-aggregates.input';
import { ScheduledTaskMetadataSumAggregateInput } from './scheduled-task-metadata-sum-aggregate.input';
import { ScheduledTaskMetadataWhereInput } from './scheduled-task-metadata-where.input';

@ArgsType()
export class ScheduledTaskMetadataGroupByArgs {
  @Field(() => ScheduledTaskMetadataWhereInput, { nullable: true })
  @Type(() => ScheduledTaskMetadataWhereInput)
  where?: ScheduledTaskMetadataWhereInput;

  @Field(() => [ScheduledTaskMetadataOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<ScheduledTaskMetadataOrderByWithAggregationInput>;

  @Field(() => [ScheduledTaskMetadataScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof ScheduledTaskMetadataScalarFieldEnum>;

  @Field(() => ScheduledTaskMetadataScalarWhereWithAggregatesInput, { nullable: true })
  having?: ScheduledTaskMetadataScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ScheduledTaskMetadataCountAggregateInput, { nullable: true })
  _count?: ScheduledTaskMetadataCountAggregateInput;

  @Field(() => ScheduledTaskMetadataAvgAggregateInput, { nullable: true })
  _avg?: ScheduledTaskMetadataAvgAggregateInput;

  @Field(() => ScheduledTaskMetadataSumAggregateInput, { nullable: true })
  _sum?: ScheduledTaskMetadataSumAggregateInput;

  @Field(() => ScheduledTaskMetadataMinAggregateInput, { nullable: true })
  _min?: ScheduledTaskMetadataMinAggregateInput;

  @Field(() => ScheduledTaskMetadataMaxAggregateInput, { nullable: true })
  _max?: ScheduledTaskMetadataMaxAggregateInput;
}
