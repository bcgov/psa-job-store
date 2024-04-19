import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileOrganizationAvgAggregateInput } from './job-profile-organization-avg-aggregate.input';
import { JobProfileOrganizationCountAggregateInput } from './job-profile-organization-count-aggregate.input';
import { JobProfileOrganizationMaxAggregateInput } from './job-profile-organization-max-aggregate.input';
import { JobProfileOrganizationMinAggregateInput } from './job-profile-organization-min-aggregate.input';
import { JobProfileOrganizationOrderByWithAggregationInput } from './job-profile-organization-order-by-with-aggregation.input';
import { JobProfileOrganizationScalarFieldEnum } from './job-profile-organization-scalar-field.enum';
import { JobProfileOrganizationScalarWhereWithAggregatesInput } from './job-profile-organization-scalar-where-with-aggregates.input';
import { JobProfileOrganizationSumAggregateInput } from './job-profile-organization-sum-aggregate.input';
import { JobProfileOrganizationWhereInput } from './job-profile-organization-where.input';

@ArgsType()
export class JobProfileOrganizationGroupByArgs {
  @Field(() => JobProfileOrganizationWhereInput, { nullable: true })
  @Type(() => JobProfileOrganizationWhereInput)
  where?: JobProfileOrganizationWhereInput;

  @Field(() => [JobProfileOrganizationOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileOrganizationOrderByWithAggregationInput>;

  @Field(() => [JobProfileOrganizationScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileOrganizationScalarFieldEnum>;

  @Field(() => JobProfileOrganizationScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileOrganizationScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileOrganizationCountAggregateInput, { nullable: true })
  _count?: JobProfileOrganizationCountAggregateInput;

  @Field(() => JobProfileOrganizationAvgAggregateInput, { nullable: true })
  _avg?: JobProfileOrganizationAvgAggregateInput;

  @Field(() => JobProfileOrganizationSumAggregateInput, { nullable: true })
  _sum?: JobProfileOrganizationSumAggregateInput;

  @Field(() => JobProfileOrganizationMinAggregateInput, { nullable: true })
  _min?: JobProfileOrganizationMinAggregateInput;

  @Field(() => JobProfileOrganizationMaxAggregateInput, { nullable: true })
  _max?: JobProfileOrganizationMaxAggregateInput;
}
