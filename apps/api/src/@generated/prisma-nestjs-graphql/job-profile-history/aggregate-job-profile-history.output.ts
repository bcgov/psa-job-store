import { Field, ObjectType } from '@nestjs/graphql';
import { JobProfileHistoryAvgAggregate } from './job-profile-history-avg-aggregate.output';
import { JobProfileHistoryCountAggregate } from './job-profile-history-count-aggregate.output';
import { JobProfileHistoryMaxAggregate } from './job-profile-history-max-aggregate.output';
import { JobProfileHistoryMinAggregate } from './job-profile-history-min-aggregate.output';
import { JobProfileHistorySumAggregate } from './job-profile-history-sum-aggregate.output';

@ObjectType()
export class AggregateJobProfileHistory {
  @Field(() => JobProfileHistoryCountAggregate, { nullable: true })
  _count?: JobProfileHistoryCountAggregate;

  @Field(() => JobProfileHistoryAvgAggregate, { nullable: true })
  _avg?: JobProfileHistoryAvgAggregate;

  @Field(() => JobProfileHistorySumAggregate, { nullable: true })
  _sum?: JobProfileHistorySumAggregate;

  @Field(() => JobProfileHistoryMinAggregate, { nullable: true })
  _min?: JobProfileHistoryMinAggregate;

  @Field(() => JobProfileHistoryMaxAggregate, { nullable: true })
  _max?: JobProfileHistoryMaxAggregate;
}
