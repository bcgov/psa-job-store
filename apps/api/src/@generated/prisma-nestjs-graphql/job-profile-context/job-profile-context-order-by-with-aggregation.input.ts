import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileContextAvgOrderByAggregateInput } from './job-profile-context-avg-order-by-aggregate.input';
import { JobProfileContextCountOrderByAggregateInput } from './job-profile-context-count-order-by-aggregate.input';
import { JobProfileContextMaxOrderByAggregateInput } from './job-profile-context-max-order-by-aggregate.input';
import { JobProfileContextMinOrderByAggregateInput } from './job-profile-context-min-order-by-aggregate.input';
import { JobProfileContextSumOrderByAggregateInput } from './job-profile-context-sum-order-by-aggregate.input';

@InputType()
export class JobProfileContextOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder;

  @Field(() => JobProfileContextCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileContextCountOrderByAggregateInput;

  @Field(() => JobProfileContextAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileContextAvgOrderByAggregateInput;

  @Field(() => JobProfileContextMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileContextMaxOrderByAggregateInput;

  @Field(() => JobProfileContextMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileContextMinOrderByAggregateInput;

  @Field(() => JobProfileContextSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileContextSumOrderByAggregateInput;
}
