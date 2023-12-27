import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileCareerGroupCountOrderByAggregateInput } from './job-profile-career-group-count-order-by-aggregate.input';
import { JobProfileCareerGroupAvgOrderByAggregateInput } from './job-profile-career-group-avg-order-by-aggregate.input';
import { JobProfileCareerGroupMaxOrderByAggregateInput } from './job-profile-career-group-max-order-by-aggregate.input';
import { JobProfileCareerGroupMinOrderByAggregateInput } from './job-profile-career-group-min-order-by-aggregate.input';
import { JobProfileCareerGroupSumOrderByAggregateInput } from './job-profile-career-group-sum-order-by-aggregate.input';

@InputType()
export class JobProfileCareerGroupOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileCareerGroupCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileCareerGroupCountOrderByAggregateInput;

  @Field(() => JobProfileCareerGroupAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileCareerGroupAvgOrderByAggregateInput;

  @Field(() => JobProfileCareerGroupMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileCareerGroupMaxOrderByAggregateInput;

  @Field(() => JobProfileCareerGroupMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileCareerGroupMinOrderByAggregateInput;

  @Field(() => JobProfileCareerGroupSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileCareerGroupSumOrderByAggregateInput;
}
