import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { JobProfileHistoryCountOrderByAggregateInput } from './job-profile-history-count-order-by-aggregate.input';
import { JobProfileHistoryAvgOrderByAggregateInput } from './job-profile-history-avg-order-by-aggregate.input';
import { JobProfileHistoryMaxOrderByAggregateInput } from './job-profile-history-max-order-by-aggregate.input';
import { JobProfileHistoryMinOrderByAggregateInput } from './job-profile-history-min-order-by-aggregate.input';
import { JobProfileHistorySumOrderByAggregateInput } from './job-profile-history-sum-order-by-aggregate.input';

@InputType()
export class JobProfileHistoryOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  json?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  created_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  created_by?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_by?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  deleted_at?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  deleted_by?: keyof typeof SortOrder;

  @Field(() => JobProfileHistoryCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileHistoryCountOrderByAggregateInput;

  @Field(() => JobProfileHistoryAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileHistoryAvgOrderByAggregateInput;

  @Field(() => JobProfileHistoryMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileHistoryMaxOrderByAggregateInput;

  @Field(() => JobProfileHistoryMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileHistoryMinOrderByAggregateInput;

  @Field(() => JobProfileHistorySumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileHistorySumOrderByAggregateInput;
}
