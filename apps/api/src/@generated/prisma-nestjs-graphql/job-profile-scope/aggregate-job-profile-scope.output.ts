import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JobProfileScopeCountAggregate } from './job-profile-scope-count-aggregate.output';
import { JobProfileScopeAvgAggregate } from './job-profile-scope-avg-aggregate.output';
import { JobProfileScopeSumAggregate } from './job-profile-scope-sum-aggregate.output';
import { JobProfileScopeMinAggregate } from './job-profile-scope-min-aggregate.output';
import { JobProfileScopeMaxAggregate } from './job-profile-scope-max-aggregate.output';

@ObjectType()
export class AggregateJobProfileScope {
  @Field(() => JobProfileScopeCountAggregate, { nullable: true })
  _count?: JobProfileScopeCountAggregate;

  @Field(() => JobProfileScopeAvgAggregate, { nullable: true })
  _avg?: JobProfileScopeAvgAggregate;

  @Field(() => JobProfileScopeSumAggregate, { nullable: true })
  _sum?: JobProfileScopeSumAggregate;

  @Field(() => JobProfileScopeMinAggregate, { nullable: true })
  _min?: JobProfileScopeMinAggregate;

  @Field(() => JobProfileScopeMaxAggregate, { nullable: true })
  _max?: JobProfileScopeMaxAggregate;
}
