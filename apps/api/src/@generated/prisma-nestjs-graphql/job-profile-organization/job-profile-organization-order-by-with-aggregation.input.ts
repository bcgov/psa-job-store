import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileOrganizationAvgOrderByAggregateInput } from './job-profile-organization-avg-order-by-aggregate.input';
import { JobProfileOrganizationCountOrderByAggregateInput } from './job-profile-organization-count-order-by-aggregate.input';
import { JobProfileOrganizationMaxOrderByAggregateInput } from './job-profile-organization-max-order-by-aggregate.input';
import { JobProfileOrganizationMinOrderByAggregateInput } from './job-profile-organization-min-order-by-aggregate.input';
import { JobProfileOrganizationSumOrderByAggregateInput } from './job-profile-organization-sum-order-by-aggregate.input';

@InputType()
export class JobProfileOrganizationOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  organization_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => JobProfileOrganizationCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileOrganizationCountOrderByAggregateInput;

  @Field(() => JobProfileOrganizationAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileOrganizationAvgOrderByAggregateInput;

  @Field(() => JobProfileOrganizationMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileOrganizationMaxOrderByAggregateInput;

  @Field(() => JobProfileOrganizationMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileOrganizationMinOrderByAggregateInput;

  @Field(() => JobProfileOrganizationSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileOrganizationSumOrderByAggregateInput;
}
