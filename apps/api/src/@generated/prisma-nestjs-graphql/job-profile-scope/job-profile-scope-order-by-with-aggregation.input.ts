import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileScopeAvgOrderByAggregateInput } from './job-profile-scope-avg-order-by-aggregate.input';
import { JobProfileScopeCountOrderByAggregateInput } from './job-profile-scope-count-order-by-aggregate.input';
import { JobProfileScopeMaxOrderByAggregateInput } from './job-profile-scope-max-order-by-aggregate.input';
import { JobProfileScopeMinOrderByAggregateInput } from './job-profile-scope-min-order-by-aggregate.input';
import { JobProfileScopeSumOrderByAggregateInput } from './job-profile-scope-sum-order-by-aggregate.input';

@InputType()
export class JobProfileScopeOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder;

  @Field(() => JobProfileScopeCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileScopeCountOrderByAggregateInput;

  @Field(() => JobProfileScopeAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileScopeAvgOrderByAggregateInput;

  @Field(() => JobProfileScopeMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileScopeMaxOrderByAggregateInput;

  @Field(() => JobProfileScopeMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileScopeMinOrderByAggregateInput;

  @Field(() => JobProfileScopeSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileScopeSumOrderByAggregateInput;
}
