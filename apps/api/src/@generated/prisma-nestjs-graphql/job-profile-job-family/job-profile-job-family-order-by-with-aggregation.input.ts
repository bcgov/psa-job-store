import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileJobFamilyAvgOrderByAggregateInput } from './job-profile-job-family-avg-order-by-aggregate.input';
import { JobProfileJobFamilyCountOrderByAggregateInput } from './job-profile-job-family-count-order-by-aggregate.input';
import { JobProfileJobFamilyMaxOrderByAggregateInput } from './job-profile-job-family-max-order-by-aggregate.input';
import { JobProfileJobFamilyMinOrderByAggregateInput } from './job-profile-job-family-min-order-by-aggregate.input';
import { JobProfileJobFamilySumOrderByAggregateInput } from './job-profile-job-family-sum-order-by-aggregate.input';

@InputType()
export class JobProfileJobFamilyOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileJobFamilyCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileJobFamilyCountOrderByAggregateInput;

  @Field(() => JobProfileJobFamilyAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileJobFamilyAvgOrderByAggregateInput;

  @Field(() => JobProfileJobFamilyMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileJobFamilyMaxOrderByAggregateInput;

  @Field(() => JobProfileJobFamilyMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileJobFamilyMinOrderByAggregateInput;

  @Field(() => JobProfileJobFamilySumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileJobFamilySumOrderByAggregateInput;
}
