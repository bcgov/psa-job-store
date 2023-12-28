import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileStreamCountOrderByAggregateInput } from './job-profile-stream-count-order-by-aggregate.input';
import { JobProfileStreamAvgOrderByAggregateInput } from './job-profile-stream-avg-order-by-aggregate.input';
import { JobProfileStreamMaxOrderByAggregateInput } from './job-profile-stream-max-order-by-aggregate.input';
import { JobProfileStreamMinOrderByAggregateInput } from './job-profile-stream-min-order-by-aggregate.input';
import { JobProfileStreamSumOrderByAggregateInput } from './job-profile-stream-sum-order-by-aggregate.input';

@InputType()
export class JobProfileStreamOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileStreamCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileStreamCountOrderByAggregateInput;

  @Field(() => JobProfileStreamAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileStreamAvgOrderByAggregateInput;

  @Field(() => JobProfileStreamMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileStreamMaxOrderByAggregateInput;

  @Field(() => JobProfileStreamMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileStreamMinOrderByAggregateInput;

  @Field(() => JobProfileStreamSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileStreamSumOrderByAggregateInput;
}
