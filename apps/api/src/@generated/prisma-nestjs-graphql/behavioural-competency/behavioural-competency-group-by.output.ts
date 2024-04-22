import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BehaviouralCompetencyCategory } from '../prisma/behavioural-competency-category.enum';
import { BehaviouralCompetencyType } from '../prisma/behavioural-competency-type.enum';
import { BehaviouralCompetencyAvgAggregate } from './behavioural-competency-avg-aggregate.output';
import { BehaviouralCompetencyCountAggregate } from './behavioural-competency-count-aggregate.output';
import { BehaviouralCompetencyMaxAggregate } from './behavioural-competency-max-aggregate.output';
import { BehaviouralCompetencyMinAggregate } from './behavioural-competency-min-aggregate.output';
import { BehaviouralCompetencySumAggregate } from './behavioural-competency-sum-aggregate.output';

@ObjectType()
export class BehaviouralCompetencyGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => BehaviouralCompetencyType, { nullable: false })
  type!: keyof typeof BehaviouralCompetencyType;

  @Field(() => BehaviouralCompetencyCategory, { nullable: false })
  category!: keyof typeof BehaviouralCompetencyCategory;

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
