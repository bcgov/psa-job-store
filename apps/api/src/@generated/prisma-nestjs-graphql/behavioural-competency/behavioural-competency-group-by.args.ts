import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyOrderByWithAggregationInput } from './behavioural-competency-order-by-with-aggregation.input';
import { BehaviouralCompetencyScalarFieldEnum } from './behavioural-competency-scalar-field.enum';
import { BehaviouralCompetencyScalarWhereWithAggregatesInput } from './behavioural-competency-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { BehaviouralCompetencyCountAggregateInput } from './behavioural-competency-count-aggregate.input';
import { BehaviouralCompetencyAvgAggregateInput } from './behavioural-competency-avg-aggregate.input';
import { BehaviouralCompetencySumAggregateInput } from './behavioural-competency-sum-aggregate.input';
import { BehaviouralCompetencyMinAggregateInput } from './behavioural-competency-min-aggregate.input';
import { BehaviouralCompetencyMaxAggregateInput } from './behavioural-competency-max-aggregate.input';

@ArgsType()
export class BehaviouralCompetencyGroupByArgs {
  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => BehaviouralCompetencyWhereInput)
  where?: BehaviouralCompetencyWhereInput;

  @Field(() => [BehaviouralCompetencyOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<BehaviouralCompetencyOrderByWithAggregationInput>;

  @Field(() => [BehaviouralCompetencyScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof BehaviouralCompetencyScalarFieldEnum>;

  @Field(() => BehaviouralCompetencyScalarWhereWithAggregatesInput, { nullable: true })
  having?: BehaviouralCompetencyScalarWhereWithAggregatesInput;

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
