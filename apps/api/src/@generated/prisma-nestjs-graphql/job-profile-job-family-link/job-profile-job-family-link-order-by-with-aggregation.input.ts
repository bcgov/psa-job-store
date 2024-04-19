import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileJobFamilyLinkAvgOrderByAggregateInput } from './job-profile-job-family-link-avg-order-by-aggregate.input';
import { JobProfileJobFamilyLinkCountOrderByAggregateInput } from './job-profile-job-family-link-count-order-by-aggregate.input';
import { JobProfileJobFamilyLinkMaxOrderByAggregateInput } from './job-profile-job-family-link-max-order-by-aggregate.input';
import { JobProfileJobFamilyLinkMinOrderByAggregateInput } from './job-profile-job-family-link-min-order-by-aggregate.input';
import { JobProfileJobFamilyLinkSumOrderByAggregateInput } from './job-profile-job-family-link-sum-order-by-aggregate.input';

@InputType()
export class JobProfileJobFamilyLinkOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  jobProfileId?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  jobFamilyId?: keyof typeof SortOrder;

  @Field(() => JobProfileJobFamilyLinkCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileJobFamilyLinkCountOrderByAggregateInput;

  @Field(() => JobProfileJobFamilyLinkAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileJobFamilyLinkAvgOrderByAggregateInput;

  @Field(() => JobProfileJobFamilyLinkMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileJobFamilyLinkMaxOrderByAggregateInput;

  @Field(() => JobProfileJobFamilyLinkMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileJobFamilyLinkMinOrderByAggregateInput;

  @Field(() => JobProfileJobFamilyLinkSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileJobFamilyLinkSumOrderByAggregateInput;
}
