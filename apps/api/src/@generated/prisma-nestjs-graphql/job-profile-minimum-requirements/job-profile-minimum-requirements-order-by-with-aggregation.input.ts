import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileMinimumRequirementsAvgOrderByAggregateInput } from './job-profile-minimum-requirements-avg-order-by-aggregate.input';
import { JobProfileMinimumRequirementsCountOrderByAggregateInput } from './job-profile-minimum-requirements-count-order-by-aggregate.input';
import { JobProfileMinimumRequirementsMaxOrderByAggregateInput } from './job-profile-minimum-requirements-max-order-by-aggregate.input';
import { JobProfileMinimumRequirementsMinOrderByAggregateInput } from './job-profile-minimum-requirements-min-order-by-aggregate.input';
import { JobProfileMinimumRequirementsSumOrderByAggregateInput } from './job-profile-minimum-requirements-sum-order-by-aggregate.input';

@InputType()
export class JobProfileMinimumRequirementsOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  requirement?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  grade?: keyof typeof SortOrder;

  @Field(() => JobProfileMinimumRequirementsCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileMinimumRequirementsCountOrderByAggregateInput;

  @Field(() => JobProfileMinimumRequirementsAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileMinimumRequirementsAvgOrderByAggregateInput;

  @Field(() => JobProfileMinimumRequirementsMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileMinimumRequirementsMaxOrderByAggregateInput;

  @Field(() => JobProfileMinimumRequirementsMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileMinimumRequirementsMinOrderByAggregateInput;

  @Field(() => JobProfileMinimumRequirementsSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileMinimumRequirementsSumOrderByAggregateInput;
}
