import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileClassificationCountOrderByAggregateInput } from './job-profile-classification-count-order-by-aggregate.input';
import { JobProfileClassificationAvgOrderByAggregateInput } from './job-profile-classification-avg-order-by-aggregate.input';
import { JobProfileClassificationMaxOrderByAggregateInput } from './job-profile-classification-max-order-by-aggregate.input';
import { JobProfileClassificationMinOrderByAggregateInput } from './job-profile-classification-min-order-by-aggregate.input';
import { JobProfileClassificationSumOrderByAggregateInput } from './job-profile-classification-sum-order-by-aggregate.input';

@InputType()
export class JobProfileClassificationOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => JobProfileClassificationCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileClassificationCountOrderByAggregateInput;

  @Field(() => JobProfileClassificationAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileClassificationAvgOrderByAggregateInput;

  @Field(() => JobProfileClassificationMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileClassificationMaxOrderByAggregateInput;

  @Field(() => JobProfileClassificationMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileClassificationMinOrderByAggregateInput;

  @Field(() => JobProfileClassificationSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileClassificationSumOrderByAggregateInput;
}
