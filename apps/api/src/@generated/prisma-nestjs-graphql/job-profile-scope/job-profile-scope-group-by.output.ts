import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JobProfileScopeAvgAggregate } from './job-profile-scope-avg-aggregate.output';
import { JobProfileScopeCountAggregate } from './job-profile-scope-count-aggregate.output';
import { JobProfileScopeMaxAggregate } from './job-profile-scope-max-aggregate.output';
import { JobProfileScopeMinAggregate } from './job-profile-scope-min-aggregate.output';
import { JobProfileScopeSumAggregate } from './job-profile-scope-sum-aggregate.output';

@ObjectType()
export class JobProfileScopeGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

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
