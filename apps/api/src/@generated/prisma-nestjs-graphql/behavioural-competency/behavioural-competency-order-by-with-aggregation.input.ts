import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { BehaviouralCompetencyCountOrderByAggregateInput } from './behavioural-competency-count-order-by-aggregate.input';
import { BehaviouralCompetencyAvgOrderByAggregateInput } from './behavioural-competency-avg-order-by-aggregate.input';
import { BehaviouralCompetencyMaxOrderByAggregateInput } from './behavioural-competency-max-order-by-aggregate.input';
import { BehaviouralCompetencyMinOrderByAggregateInput } from './behavioural-competency-min-order-by-aggregate.input';
import { BehaviouralCompetencySumOrderByAggregateInput } from './behavioural-competency-sum-order-by-aggregate.input';

@InputType()
export class BehaviouralCompetencyOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  ministry_id?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  membership?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  group?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder;

  @Field(() => BehaviouralCompetencyCountOrderByAggregateInput, { nullable: true })
  _count?: BehaviouralCompetencyCountOrderByAggregateInput;

  @Field(() => BehaviouralCompetencyAvgOrderByAggregateInput, { nullable: true })
  _avg?: BehaviouralCompetencyAvgOrderByAggregateInput;

  @Field(() => BehaviouralCompetencyMaxOrderByAggregateInput, { nullable: true })
  _max?: BehaviouralCompetencyMaxOrderByAggregateInput;

  @Field(() => BehaviouralCompetencyMinOrderByAggregateInput, { nullable: true })
  _min?: BehaviouralCompetencyMinOrderByAggregateInput;

  @Field(() => BehaviouralCompetencySumOrderByAggregateInput, { nullable: true })
  _sum?: BehaviouralCompetencySumOrderByAggregateInput;
}
