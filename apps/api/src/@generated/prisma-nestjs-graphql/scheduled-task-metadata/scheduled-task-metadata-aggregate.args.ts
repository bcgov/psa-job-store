import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { ScheduledTaskMetadataAvgAggregateInput } from './scheduled-task-metadata-avg-aggregate.input';
import { ScheduledTaskMetadataCountAggregateInput } from './scheduled-task-metadata-count-aggregate.input';
import { ScheduledTaskMetadataMaxAggregateInput } from './scheduled-task-metadata-max-aggregate.input';
import { ScheduledTaskMetadataMinAggregateInput } from './scheduled-task-metadata-min-aggregate.input';
import { ScheduledTaskMetadataOrderByWithRelationAndSearchRelevanceInput } from './scheduled-task-metadata-order-by-with-relation-and-search-relevance.input';
import { ScheduledTaskMetadataSumAggregateInput } from './scheduled-task-metadata-sum-aggregate.input';
import { ScheduledTaskMetadataWhereUniqueInput } from './scheduled-task-metadata-where-unique.input';
import { ScheduledTaskMetadataWhereInput } from './scheduled-task-metadata-where.input';

@ArgsType()
export class ScheduledTaskMetadataAggregateArgs {
  @Field(() => ScheduledTaskMetadataWhereInput, { nullable: true })
  @Type(() => ScheduledTaskMetadataWhereInput)
  where?: ScheduledTaskMetadataWhereInput;

  @Field(() => [ScheduledTaskMetadataOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<ScheduledTaskMetadataOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => ScheduledTaskMetadataWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ScheduledTaskMetadataWhereUniqueInput, 'task'>;

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
