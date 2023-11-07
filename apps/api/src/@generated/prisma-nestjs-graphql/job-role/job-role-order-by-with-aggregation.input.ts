import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobRoleCountOrderByAggregateInput } from './job-role-count-order-by-aggregate.input';
import { JobRoleAvgOrderByAggregateInput } from './job-role-avg-order-by-aggregate.input';
import { JobRoleMaxOrderByAggregateInput } from './job-role-max-order-by-aggregate.input';
import { JobRoleMinOrderByAggregateInput } from './job-role-min-order-by-aggregate.input';
import { JobRoleSumOrderByAggregateInput } from './job-role-sum-order-by-aggregate.input';

@InputType()
export class JobRoleOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobRoleCountOrderByAggregateInput, { nullable: true })
  _count?: JobRoleCountOrderByAggregateInput;

  @Field(() => JobRoleAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobRoleAvgOrderByAggregateInput;

  @Field(() => JobRoleMaxOrderByAggregateInput, { nullable: true })
  _max?: JobRoleMaxOrderByAggregateInput;

  @Field(() => JobRoleMinOrderByAggregateInput, { nullable: true })
  _min?: JobRoleMinOrderByAggregateInput;

  @Field(() => JobRoleSumOrderByAggregateInput, { nullable: true })
  _sum?: JobRoleSumOrderByAggregateInput;
}
