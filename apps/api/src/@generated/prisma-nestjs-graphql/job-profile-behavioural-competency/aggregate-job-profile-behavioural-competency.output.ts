import { Field, ObjectType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyAvgAggregate } from './job-profile-behavioural-competency-avg-aggregate.output';
import { JobProfileBehaviouralCompetencyCountAggregate } from './job-profile-behavioural-competency-count-aggregate.output';
import { JobProfileBehaviouralCompetencyMaxAggregate } from './job-profile-behavioural-competency-max-aggregate.output';
import { JobProfileBehaviouralCompetencyMinAggregate } from './job-profile-behavioural-competency-min-aggregate.output';
import { JobProfileBehaviouralCompetencySumAggregate } from './job-profile-behavioural-competency-sum-aggregate.output';

@ObjectType()
export class AggregateJobProfileBehaviouralCompetency {
  @Field(() => JobProfileBehaviouralCompetencyCountAggregate, { nullable: true })
  _count?: JobProfileBehaviouralCompetencyCountAggregate;

  @Field(() => JobProfileBehaviouralCompetencyAvgAggregate, { nullable: true })
  _avg?: JobProfileBehaviouralCompetencyAvgAggregate;

  @Field(() => JobProfileBehaviouralCompetencySumAggregate, { nullable: true })
  _sum?: JobProfileBehaviouralCompetencySumAggregate;

  @Field(() => JobProfileBehaviouralCompetencyMinAggregate, { nullable: true })
  _min?: JobProfileBehaviouralCompetencyMinAggregate;

  @Field(() => JobProfileBehaviouralCompetencyMaxAggregate, { nullable: true })
  _max?: JobProfileBehaviouralCompetencyMaxAggregate;
}
