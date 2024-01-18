import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileRoleCountOrderByAggregateInput } from './job-profile-role-count-order-by-aggregate.input';
import { JobProfileRoleAvgOrderByAggregateInput } from './job-profile-role-avg-order-by-aggregate.input';
import { JobProfileRoleMaxOrderByAggregateInput } from './job-profile-role-max-order-by-aggregate.input';
import { JobProfileRoleMinOrderByAggregateInput } from './job-profile-role-min-order-by-aggregate.input';
import { JobProfileRoleSumOrderByAggregateInput } from './job-profile-role-sum-order-by-aggregate.input';

@InputType()
export class JobProfileRoleOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileRoleCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileRoleCountOrderByAggregateInput;

  @Field(() => JobProfileRoleAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileRoleAvgOrderByAggregateInput;

  @Field(() => JobProfileRoleMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileRoleMaxOrderByAggregateInput;

  @Field(() => JobProfileRoleMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileRoleMinOrderByAggregateInput;

  @Field(() => JobProfileRoleSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileRoleSumOrderByAggregateInput;
}
