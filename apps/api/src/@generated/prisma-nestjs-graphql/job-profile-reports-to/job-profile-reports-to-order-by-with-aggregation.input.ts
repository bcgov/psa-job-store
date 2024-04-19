import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileReportsToAvgOrderByAggregateInput } from './job-profile-reports-to-avg-order-by-aggregate.input';
import { JobProfileReportsToCountOrderByAggregateInput } from './job-profile-reports-to-count-order-by-aggregate.input';
import { JobProfileReportsToMaxOrderByAggregateInput } from './job-profile-reports-to-max-order-by-aggregate.input';
import { JobProfileReportsToMinOrderByAggregateInput } from './job-profile-reports-to-min-order-by-aggregate.input';
import { JobProfileReportsToSumOrderByAggregateInput } from './job-profile-reports-to-sum-order-by-aggregate.input';

@InputType()
export class JobProfileReportsToOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => JobProfileReportsToCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileReportsToCountOrderByAggregateInput;

  @Field(() => JobProfileReportsToAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileReportsToAvgOrderByAggregateInput;

  @Field(() => JobProfileReportsToMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileReportsToMaxOrderByAggregateInput;

  @Field(() => JobProfileReportsToMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileReportsToMinOrderByAggregateInput;

  @Field(() => JobProfileReportsToSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileReportsToSumOrderByAggregateInput;
}
