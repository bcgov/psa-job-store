import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileStreamLinkCountOrderByAggregateInput } from './job-profile-stream-link-count-order-by-aggregate.input';
import { JobProfileStreamLinkAvgOrderByAggregateInput } from './job-profile-stream-link-avg-order-by-aggregate.input';
import { JobProfileStreamLinkMaxOrderByAggregateInput } from './job-profile-stream-link-max-order-by-aggregate.input';
import { JobProfileStreamLinkMinOrderByAggregateInput } from './job-profile-stream-link-min-order-by-aggregate.input';
import { JobProfileStreamLinkSumOrderByAggregateInput } from './job-profile-stream-link-sum-order-by-aggregate.input';

@InputType()
export class JobProfileStreamLinkOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  jobProfileId?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  streamId?: keyof typeof SortOrder;

  @Field(() => JobProfileStreamLinkCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileStreamLinkCountOrderByAggregateInput;

  @Field(() => JobProfileStreamLinkAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileStreamLinkAvgOrderByAggregateInput;

  @Field(() => JobProfileStreamLinkMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileStreamLinkMaxOrderByAggregateInput;

  @Field(() => JobProfileStreamLinkMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileStreamLinkMinOrderByAggregateInput;

  @Field(() => JobProfileStreamLinkSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileStreamLinkSumOrderByAggregateInput;
}
