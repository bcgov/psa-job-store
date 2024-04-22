import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileRoleAvgAggregateInput } from './job-profile-role-avg-aggregate.input';
import { JobProfileRoleCountAggregateInput } from './job-profile-role-count-aggregate.input';
import { JobProfileRoleMaxAggregateInput } from './job-profile-role-max-aggregate.input';
import { JobProfileRoleMinAggregateInput } from './job-profile-role-min-aggregate.input';
import { JobProfileRoleOrderByWithAggregationInput } from './job-profile-role-order-by-with-aggregation.input';
import { JobProfileRoleScalarFieldEnum } from './job-profile-role-scalar-field.enum';
import { JobProfileRoleScalarWhereWithAggregatesInput } from './job-profile-role-scalar-where-with-aggregates.input';
import { JobProfileRoleSumAggregateInput } from './job-profile-role-sum-aggregate.input';
import { JobProfileRoleWhereInput } from './job-profile-role-where.input';

@ArgsType()
export class JobProfileRoleGroupByArgs {
  @Field(() => JobProfileRoleWhereInput, { nullable: true })
  @Type(() => JobProfileRoleWhereInput)
  where?: JobProfileRoleWhereInput;

  @Field(() => [JobProfileRoleOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileRoleOrderByWithAggregationInput>;

  @Field(() => [JobProfileRoleScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileRoleScalarFieldEnum>;

  @Field(() => JobProfileRoleScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileRoleScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileRoleCountAggregateInput, { nullable: true })
  _count?: JobProfileRoleCountAggregateInput;

  @Field(() => JobProfileRoleAvgAggregateInput, { nullable: true })
  _avg?: JobProfileRoleAvgAggregateInput;

  @Field(() => JobProfileRoleSumAggregateInput, { nullable: true })
  _sum?: JobProfileRoleSumAggregateInput;

  @Field(() => JobProfileRoleMinAggregateInput, { nullable: true })
  _min?: JobProfileRoleMinAggregateInput;

  @Field(() => JobProfileRoleMaxAggregateInput, { nullable: true })
  _max?: JobProfileRoleMaxAggregateInput;
}
