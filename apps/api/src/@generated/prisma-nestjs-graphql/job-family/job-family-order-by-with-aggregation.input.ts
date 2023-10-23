import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobFamilyCountOrderByAggregateInput } from './job-family-count-order-by-aggregate.input';
import { JobFamilyAvgOrderByAggregateInput } from './job-family-avg-order-by-aggregate.input';
import { JobFamilyMaxOrderByAggregateInput } from './job-family-max-order-by-aggregate.input';
import { JobFamilyMinOrderByAggregateInput } from './job-family-min-order-by-aggregate.input';
import { JobFamilySumOrderByAggregateInput } from './job-family-sum-order-by-aggregate.input';

@InputType()
export class JobFamilyOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobFamilyCountOrderByAggregateInput, { nullable: true })
  _count?: JobFamilyCountOrderByAggregateInput;

  @Field(() => JobFamilyAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobFamilyAvgOrderByAggregateInput;

  @Field(() => JobFamilyMaxOrderByAggregateInput, { nullable: true })
  _max?: JobFamilyMaxOrderByAggregateInput;

  @Field(() => JobFamilyMinOrderByAggregateInput, { nullable: true })
  _min?: JobFamilyMinOrderByAggregateInput;

  @Field(() => JobFamilySumOrderByAggregateInput, { nullable: true })
  _sum?: JobFamilySumOrderByAggregateInput;
}
