import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { BehaviouralCompetencyMembership } from '../prisma/behavioural-competency-membership.enum';
import { BehaviouralCompetencyGroup } from '../prisma/behavioural-competency-group.enum';
import { BehaviouralCompetencyCountAggregate } from './behavioural-competency-count-aggregate.output';
import { BehaviouralCompetencyAvgAggregate } from './behavioural-competency-avg-aggregate.output';
import { BehaviouralCompetencySumAggregate } from './behavioural-competency-sum-aggregate.output';
import { BehaviouralCompetencyMinAggregate } from './behavioural-competency-min-aggregate.output';
import { BehaviouralCompetencyMaxAggregate } from './behavioural-competency-max-aggregate.output';

@ObjectType()
export class BehaviouralCompetencyGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: true })
  ministry_id?: number;

  @Field(() => BehaviouralCompetencyMembership, { nullable: false })
  membership!: keyof typeof BehaviouralCompetencyMembership;

  @Field(() => BehaviouralCompetencyGroup, { nullable: false })
  group!: keyof typeof BehaviouralCompetencyGroup;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

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
