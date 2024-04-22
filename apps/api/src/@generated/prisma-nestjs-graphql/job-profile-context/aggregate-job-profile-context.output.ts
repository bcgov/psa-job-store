import { Field, ObjectType } from '@nestjs/graphql';
import { JobProfileContextAvgAggregate } from './job-profile-context-avg-aggregate.output';
import { JobProfileContextCountAggregate } from './job-profile-context-count-aggregate.output';
import { JobProfileContextMaxAggregate } from './job-profile-context-max-aggregate.output';
import { JobProfileContextMinAggregate } from './job-profile-context-min-aggregate.output';
import { JobProfileContextSumAggregate } from './job-profile-context-sum-aggregate.output';

@ObjectType()
export class AggregateJobProfileContext {
  @Field(() => JobProfileContextCountAggregate, { nullable: true })
  _count?: JobProfileContextCountAggregate;

  @Field(() => JobProfileContextAvgAggregate, { nullable: true })
  _avg?: JobProfileContextAvgAggregate;

  @Field(() => JobProfileContextSumAggregate, { nullable: true })
  _sum?: JobProfileContextSumAggregate;

  @Field(() => JobProfileContextMinAggregate, { nullable: true })
  _min?: JobProfileContextMinAggregate;

  @Field(() => JobProfileContextMaxAggregate, { nullable: true })
  _max?: JobProfileContextMaxAggregate;
}
