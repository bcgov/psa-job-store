import { Field, ObjectType } from '@nestjs/graphql';
import { JobProfileStreamAvgAggregate } from './job-profile-stream-avg-aggregate.output';
import { JobProfileStreamCountAggregate } from './job-profile-stream-count-aggregate.output';
import { JobProfileStreamMaxAggregate } from './job-profile-stream-max-aggregate.output';
import { JobProfileStreamMinAggregate } from './job-profile-stream-min-aggregate.output';
import { JobProfileStreamSumAggregate } from './job-profile-stream-sum-aggregate.output';

@ObjectType()
export class AggregateJobProfileStream {
  @Field(() => JobProfileStreamCountAggregate, { nullable: true })
  _count?: JobProfileStreamCountAggregate;

  @Field(() => JobProfileStreamAvgAggregate, { nullable: true })
  _avg?: JobProfileStreamAvgAggregate;

  @Field(() => JobProfileStreamSumAggregate, { nullable: true })
  _sum?: JobProfileStreamSumAggregate;

  @Field(() => JobProfileStreamMinAggregate, { nullable: true })
  _min?: JobProfileStreamMinAggregate;

  @Field(() => JobProfileStreamMaxAggregate, { nullable: true })
  _max?: JobProfileStreamMaxAggregate;
}
