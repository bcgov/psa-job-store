import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileRoleTypeCountOrderByAggregateInput } from './job-profile-role-type-count-order-by-aggregate.input';
import { JobProfileRoleTypeAvgOrderByAggregateInput } from './job-profile-role-type-avg-order-by-aggregate.input';
import { JobProfileRoleTypeMaxOrderByAggregateInput } from './job-profile-role-type-max-order-by-aggregate.input';
import { JobProfileRoleTypeMinOrderByAggregateInput } from './job-profile-role-type-min-order-by-aggregate.input';
import { JobProfileRoleTypeSumOrderByAggregateInput } from './job-profile-role-type-sum-order-by-aggregate.input';

@InputType()
export class JobProfileRoleTypeOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileRoleTypeCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileRoleTypeCountOrderByAggregateInput;

  @Field(() => JobProfileRoleTypeAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileRoleTypeAvgOrderByAggregateInput;

  @Field(() => JobProfileRoleTypeMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileRoleTypeMaxOrderByAggregateInput;

  @Field(() => JobProfileRoleTypeMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileRoleTypeMinOrderByAggregateInput;

  @Field(() => JobProfileRoleTypeSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileRoleTypeSumOrderByAggregateInput;
}
