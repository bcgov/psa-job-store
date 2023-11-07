import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobRoleWhereInput } from './job-role-where.input';
import { Type } from 'class-transformer';
import { JobRoleOrderByWithAggregationInput } from './job-role-order-by-with-aggregation.input';
import { JobRoleScalarFieldEnum } from './job-role-scalar-field.enum';
import { JobRoleScalarWhereWithAggregatesInput } from './job-role-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { JobRoleCountAggregateInput } from './job-role-count-aggregate.input';
import { JobRoleAvgAggregateInput } from './job-role-avg-aggregate.input';
import { JobRoleSumAggregateInput } from './job-role-sum-aggregate.input';
import { JobRoleMinAggregateInput } from './job-role-min-aggregate.input';
import { JobRoleMaxAggregateInput } from './job-role-max-aggregate.input';

@ArgsType()
export class JobRoleGroupByArgs {
  @Field(() => JobRoleWhereInput, { nullable: true })
  @Type(() => JobRoleWhereInput)
  where?: JobRoleWhereInput;

  @Field(() => [JobRoleOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobRoleOrderByWithAggregationInput>;

  @Field(() => [JobRoleScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobRoleScalarFieldEnum>;

  @Field(() => JobRoleScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobRoleScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobRoleCountAggregateInput, { nullable: true })
  _count?: JobRoleCountAggregateInput;

  @Field(() => JobRoleAvgAggregateInput, { nullable: true })
  _avg?: JobRoleAvgAggregateInput;

  @Field(() => JobRoleSumAggregateInput, { nullable: true })
  _sum?: JobRoleSumAggregateInput;

  @Field(() => JobRoleMinAggregateInput, { nullable: true })
  _min?: JobRoleMinAggregateInput;

  @Field(() => JobRoleMaxAggregateInput, { nullable: true })
  _max?: JobRoleMaxAggregateInput;
}
