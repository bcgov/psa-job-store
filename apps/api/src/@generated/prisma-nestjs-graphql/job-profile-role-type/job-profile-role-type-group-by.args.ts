import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeAvgAggregateInput } from './job-profile-role-type-avg-aggregate.input';
import { JobProfileRoleTypeCountAggregateInput } from './job-profile-role-type-count-aggregate.input';
import { JobProfileRoleTypeMaxAggregateInput } from './job-profile-role-type-max-aggregate.input';
import { JobProfileRoleTypeMinAggregateInput } from './job-profile-role-type-min-aggregate.input';
import { JobProfileRoleTypeOrderByWithAggregationInput } from './job-profile-role-type-order-by-with-aggregation.input';
import { JobProfileRoleTypeScalarFieldEnum } from './job-profile-role-type-scalar-field.enum';
import { JobProfileRoleTypeScalarWhereWithAggregatesInput } from './job-profile-role-type-scalar-where-with-aggregates.input';
import { JobProfileRoleTypeSumAggregateInput } from './job-profile-role-type-sum-aggregate.input';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';

@ArgsType()
export class JobProfileRoleTypeGroupByArgs {
  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereInput)
  where?: JobProfileRoleTypeWhereInput;

  @Field(() => [JobProfileRoleTypeOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileRoleTypeOrderByWithAggregationInput>;

  @Field(() => [JobProfileRoleTypeScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileRoleTypeScalarFieldEnum>;

  @Field(() => JobProfileRoleTypeScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileRoleTypeScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileRoleTypeCountAggregateInput, { nullable: true })
  _count?: JobProfileRoleTypeCountAggregateInput;

  @Field(() => JobProfileRoleTypeAvgAggregateInput, { nullable: true })
  _avg?: JobProfileRoleTypeAvgAggregateInput;

  @Field(() => JobProfileRoleTypeSumAggregateInput, { nullable: true })
  _sum?: JobProfileRoleTypeSumAggregateInput;

  @Field(() => JobProfileRoleTypeMinAggregateInput, { nullable: true })
  _min?: JobProfileRoleTypeMinAggregateInput;

  @Field(() => JobProfileRoleTypeMaxAggregateInput, { nullable: true })
  _max?: JobProfileRoleTypeMaxAggregateInput;
}
