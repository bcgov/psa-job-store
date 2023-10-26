import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyCountAggregate } from './job-profile-behavioural-competency-count-aggregate.output';
import { JobProfileBehaviouralCompetencyAvgAggregate } from './job-profile-behavioural-competency-avg-aggregate.output';
import { JobProfileBehaviouralCompetencySumAggregate } from './job-profile-behavioural-competency-sum-aggregate.output';
import { JobProfileBehaviouralCompetencyMinAggregate } from './job-profile-behavioural-competency-min-aggregate.output';
import { JobProfileBehaviouralCompetencyMaxAggregate } from './job-profile-behavioural-competency-max-aggregate.output';

@ObjectType()
export class JobProfileBehaviouralCompetencyGroupBy {
  @Field(() => Int, { nullable: false })
  behavioural_competency_id!: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

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
