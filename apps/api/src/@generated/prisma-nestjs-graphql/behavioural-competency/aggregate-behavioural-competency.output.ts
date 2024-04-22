import { Field, ObjectType } from '@nestjs/graphql';
import { BehaviouralCompetencyAvgAggregate } from './behavioural-competency-avg-aggregate.output';
import { BehaviouralCompetencyCountAggregate } from './behavioural-competency-count-aggregate.output';
import { BehaviouralCompetencyMaxAggregate } from './behavioural-competency-max-aggregate.output';
import { BehaviouralCompetencyMinAggregate } from './behavioural-competency-min-aggregate.output';
import { BehaviouralCompetencySumAggregate } from './behavioural-competency-sum-aggregate.output';

@ObjectType()
export class AggregateBehaviouralCompetency {
  @Field(() => BehaviouralCompetencyCountAggregate, { nullable: true })
  _count?: BehaviouralCompetencyCountAggregate;

  @Field(() => BehaviouralCompetencyAvgAggregate, { nullable: true })
  _avg?: BehaviouralCompetencyAvgAggregate;

  @Field(() => BehaviouralCompetencySumAggregate, { nullable: true })
  _sum?: BehaviouralCompetencySumAggregate;

  @Field(() => BehaviouralCompetencyMinAggregate, { nullable: true })
  _min?: BehaviouralCompetencyMinAggregate;

  @Field(() => BehaviouralCompetencyMaxAggregate, { nullable: true })
  _max?: BehaviouralCompetencyMaxAggregate;
}
