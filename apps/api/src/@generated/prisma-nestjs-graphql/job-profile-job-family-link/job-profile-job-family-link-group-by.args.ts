import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkAvgAggregateInput } from './job-profile-job-family-link-avg-aggregate.input';
import { JobProfileJobFamilyLinkCountAggregateInput } from './job-profile-job-family-link-count-aggregate.input';
import { JobProfileJobFamilyLinkMaxAggregateInput } from './job-profile-job-family-link-max-aggregate.input';
import { JobProfileJobFamilyLinkMinAggregateInput } from './job-profile-job-family-link-min-aggregate.input';
import { JobProfileJobFamilyLinkOrderByWithAggregationInput } from './job-profile-job-family-link-order-by-with-aggregation.input';
import { JobProfileJobFamilyLinkScalarFieldEnum } from './job-profile-job-family-link-scalar-field.enum';
import { JobProfileJobFamilyLinkScalarWhereWithAggregatesInput } from './job-profile-job-family-link-scalar-where-with-aggregates.input';
import { JobProfileJobFamilyLinkSumAggregateInput } from './job-profile-job-family-link-sum-aggregate.input';
import { JobProfileJobFamilyLinkWhereInput } from './job-profile-job-family-link-where.input';

@ArgsType()
export class JobProfileJobFamilyLinkGroupByArgs {
  @Field(() => JobProfileJobFamilyLinkWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyLinkWhereInput)
  where?: JobProfileJobFamilyLinkWhereInput;

  @Field(() => [JobProfileJobFamilyLinkOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileJobFamilyLinkOrderByWithAggregationInput>;

  @Field(() => [JobProfileJobFamilyLinkScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileJobFamilyLinkScalarFieldEnum>;

  @Field(() => JobProfileJobFamilyLinkScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileJobFamilyLinkScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileJobFamilyLinkCountAggregateInput, { nullable: true })
  _count?: JobProfileJobFamilyLinkCountAggregateInput;

  @Field(() => JobProfileJobFamilyLinkAvgAggregateInput, { nullable: true })
  _avg?: JobProfileJobFamilyLinkAvgAggregateInput;

  @Field(() => JobProfileJobFamilyLinkSumAggregateInput, { nullable: true })
  _sum?: JobProfileJobFamilyLinkSumAggregateInput;

  @Field(() => JobProfileJobFamilyLinkMinAggregateInput, { nullable: true })
  _min?: JobProfileJobFamilyLinkMinAggregateInput;

  @Field(() => JobProfileJobFamilyLinkMaxAggregateInput, { nullable: true })
  _max?: JobProfileJobFamilyLinkMaxAggregateInput;
}
