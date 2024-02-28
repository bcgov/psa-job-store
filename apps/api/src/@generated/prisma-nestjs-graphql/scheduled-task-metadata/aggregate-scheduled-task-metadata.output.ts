import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ScheduledTaskMetadataCountAggregate } from './scheduled-task-metadata-count-aggregate.output';
import { ScheduledTaskMetadataAvgAggregate } from './scheduled-task-metadata-avg-aggregate.output';
import { ScheduledTaskMetadataSumAggregate } from './scheduled-task-metadata-sum-aggregate.output';
import { ScheduledTaskMetadataMinAggregate } from './scheduled-task-metadata-min-aggregate.output';
import { ScheduledTaskMetadataMaxAggregate } from './scheduled-task-metadata-max-aggregate.output';

@ObjectType()
export class AggregateScheduledTaskMetadata {
  @Field(() => ScheduledTaskMetadataCountAggregate, { nullable: true })
  _count?: ScheduledTaskMetadataCountAggregate;

  @Field(() => ScheduledTaskMetadataAvgAggregate, { nullable: true })
  _avg?: ScheduledTaskMetadataAvgAggregate;

  @Field(() => ScheduledTaskMetadataSumAggregate, { nullable: true })
  _sum?: ScheduledTaskMetadataSumAggregate;

  @Field(() => ScheduledTaskMetadataMinAggregate, { nullable: true })
  _min?: ScheduledTaskMetadataMinAggregate;

  @Field(() => ScheduledTaskMetadataMaxAggregate, { nullable: true })
  _max?: ScheduledTaskMetadataMaxAggregate;
}
