import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { JobProfileCountOrderByAggregateInput } from './job-profile-count-order-by-aggregate.input';
import { JobProfileAvgOrderByAggregateInput } from './job-profile-avg-order-by-aggregate.input';
import { JobProfileMaxOrderByAggregateInput } from './job-profile-max-order-by-aggregate.input';
import { JobProfileMinOrderByAggregateInput } from './job-profile-min-order-by-aggregate.input';
import { JobProfileSumOrderByAggregateInput } from './job-profile-sum-order-by-aggregate.input';

@InputType()
export class JobProfileOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  ministry_id?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  stream?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  number?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  context?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  overview?: keyof typeof SortOrder;

  @Field(() => JobProfileCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileCountOrderByAggregateInput;

  @Field(() => JobProfileAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileAvgOrderByAggregateInput;

  @Field(() => JobProfileMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileMaxOrderByAggregateInput;

  @Field(() => JobProfileMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileMinOrderByAggregateInput;

  @Field(() => JobProfileSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileSumOrderByAggregateInput;
}
