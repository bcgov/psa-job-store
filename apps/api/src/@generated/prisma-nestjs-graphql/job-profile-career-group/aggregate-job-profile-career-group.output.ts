import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JobProfileCareerGroupCountAggregate } from './job-profile-career-group-count-aggregate.output';
import { JobProfileCareerGroupAvgAggregate } from './job-profile-career-group-avg-aggregate.output';
import { JobProfileCareerGroupSumAggregate } from './job-profile-career-group-sum-aggregate.output';
import { JobProfileCareerGroupMinAggregate } from './job-profile-career-group-min-aggregate.output';
import { JobProfileCareerGroupMaxAggregate } from './job-profile-career-group-max-aggregate.output';

@ObjectType()
export class AggregateJobProfileCareerGroup {
  @Field(() => JobProfileCareerGroupCountAggregate, { nullable: true })
  _count?: JobProfileCareerGroupCountAggregate;

  @Field(() => JobProfileCareerGroupAvgAggregate, { nullable: true })
  _avg?: JobProfileCareerGroupAvgAggregate;

  @Field(() => JobProfileCareerGroupSumAggregate, { nullable: true })
  _sum?: JobProfileCareerGroupSumAggregate;

  @Field(() => JobProfileCareerGroupMinAggregate, { nullable: true })
  _min?: JobProfileCareerGroupMinAggregate;

  @Field(() => JobProfileCareerGroupMaxAggregate, { nullable: true })
  _max?: JobProfileCareerGroupMaxAggregate;
}
