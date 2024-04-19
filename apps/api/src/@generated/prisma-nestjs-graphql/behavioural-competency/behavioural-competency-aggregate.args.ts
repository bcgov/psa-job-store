import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyAvgAggregateInput } from './behavioural-competency-avg-aggregate.input';
import { BehaviouralCompetencyCountAggregateInput } from './behavioural-competency-count-aggregate.input';
import { BehaviouralCompetencyMaxAggregateInput } from './behavioural-competency-max-aggregate.input';
import { BehaviouralCompetencyMinAggregateInput } from './behavioural-competency-min-aggregate.input';
import { BehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput } from './behavioural-competency-order-by-with-relation-and-search-relevance.input';
import { BehaviouralCompetencySumAggregateInput } from './behavioural-competency-sum-aggregate.input';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';

@ArgsType()
export class BehaviouralCompetencyAggregateArgs {
  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => BehaviouralCompetencyWhereInput)
  where?: BehaviouralCompetencyWhereInput;

  @Field(() => [BehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<BehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => BehaviouralCompetencyWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => BehaviouralCompetencyCountAggregateInput, { nullable: true })
  _count?: BehaviouralCompetencyCountAggregateInput;

  @Field(() => BehaviouralCompetencyAvgAggregateInput, { nullable: true })
  _avg?: BehaviouralCompetencyAvgAggregateInput;

  @Field(() => BehaviouralCompetencySumAggregateInput, { nullable: true })
  _sum?: BehaviouralCompetencySumAggregateInput;

  @Field(() => BehaviouralCompetencyMinAggregateInput, { nullable: true })
  _min?: BehaviouralCompetencyMinAggregateInput;

  @Field(() => BehaviouralCompetencyMaxAggregateInput, { nullable: true })
  _max?: BehaviouralCompetencyMaxAggregateInput;
}
