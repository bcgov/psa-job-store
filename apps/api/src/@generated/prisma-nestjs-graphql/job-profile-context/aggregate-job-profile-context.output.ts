import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JobProfileContextCountAggregate } from './job-profile-context-count-aggregate.output';
import { JobProfileContextAvgAggregate } from './job-profile-context-avg-aggregate.output';
import { JobProfileContextSumAggregate } from './job-profile-context-sum-aggregate.output';
import { JobProfileContextMinAggregate } from './job-profile-context-min-aggregate.output';
import { JobProfileContextMaxAggregate } from './job-profile-context-max-aggregate.output';

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
