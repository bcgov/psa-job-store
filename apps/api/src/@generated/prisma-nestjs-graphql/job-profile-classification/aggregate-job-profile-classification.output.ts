import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JobProfileClassificationCountAggregate } from './job-profile-classification-count-aggregate.output';
import { JobProfileClassificationAvgAggregate } from './job-profile-classification-avg-aggregate.output';
import { JobProfileClassificationSumAggregate } from './job-profile-classification-sum-aggregate.output';
import { JobProfileClassificationMinAggregate } from './job-profile-classification-min-aggregate.output';
import { JobProfileClassificationMaxAggregate } from './job-profile-classification-max-aggregate.output';

@ObjectType()
export class AggregateJobProfileClassification {
  @Field(() => JobProfileClassificationCountAggregate, { nullable: true })
  _count?: JobProfileClassificationCountAggregate;

  @Field(() => JobProfileClassificationAvgAggregate, { nullable: true })
  _avg?: JobProfileClassificationAvgAggregate;

  @Field(() => JobProfileClassificationSumAggregate, { nullable: true })
  _sum?: JobProfileClassificationSumAggregate;

  @Field(() => JobProfileClassificationMinAggregate, { nullable: true })
  _min?: JobProfileClassificationMinAggregate;

  @Field(() => JobProfileClassificationMaxAggregate, { nullable: true })
  _max?: JobProfileClassificationMaxAggregate;
}
