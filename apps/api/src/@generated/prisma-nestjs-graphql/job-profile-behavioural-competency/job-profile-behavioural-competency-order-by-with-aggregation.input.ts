import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileBehaviouralCompetencyCountOrderByAggregateInput } from './job-profile-behavioural-competency-count-order-by-aggregate.input';
import { JobProfileBehaviouralCompetencyAvgOrderByAggregateInput } from './job-profile-behavioural-competency-avg-order-by-aggregate.input';
import { JobProfileBehaviouralCompetencyMaxOrderByAggregateInput } from './job-profile-behavioural-competency-max-order-by-aggregate.input';
import { JobProfileBehaviouralCompetencyMinOrderByAggregateInput } from './job-profile-behavioural-competency-min-order-by-aggregate.input';
import { JobProfileBehaviouralCompetencySumOrderByAggregateInput } from './job-profile-behavioural-competency-sum-order-by-aggregate.input';

@InputType()
export class JobProfileBehaviouralCompetencyOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  behavioural_competency_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => JobProfileBehaviouralCompetencyCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileBehaviouralCompetencyCountOrderByAggregateInput;

  @Field(() => JobProfileBehaviouralCompetencyAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileBehaviouralCompetencyAvgOrderByAggregateInput;

  @Field(() => JobProfileBehaviouralCompetencyMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileBehaviouralCompetencyMaxOrderByAggregateInput;

  @Field(() => JobProfileBehaviouralCompetencyMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileBehaviouralCompetencyMinOrderByAggregateInput;

  @Field(() => JobProfileBehaviouralCompetencySumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileBehaviouralCompetencySumOrderByAggregateInput;
}
