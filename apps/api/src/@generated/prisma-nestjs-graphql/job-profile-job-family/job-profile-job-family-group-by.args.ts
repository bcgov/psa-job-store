import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyAvgAggregateInput } from './job-profile-job-family-avg-aggregate.input';
import { JobProfileJobFamilyCountAggregateInput } from './job-profile-job-family-count-aggregate.input';
import { JobProfileJobFamilyMaxAggregateInput } from './job-profile-job-family-max-aggregate.input';
import { JobProfileJobFamilyMinAggregateInput } from './job-profile-job-family-min-aggregate.input';
import { JobProfileJobFamilyOrderByWithAggregationInput } from './job-profile-job-family-order-by-with-aggregation.input';
import { JobProfileJobFamilyScalarFieldEnum } from './job-profile-job-family-scalar-field.enum';
import { JobProfileJobFamilyScalarWhereWithAggregatesInput } from './job-profile-job-family-scalar-where-with-aggregates.input';
import { JobProfileJobFamilySumAggregateInput } from './job-profile-job-family-sum-aggregate.input';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';

@ArgsType()
export class JobProfileJobFamilyGroupByArgs {
  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  where?: JobProfileJobFamilyWhereInput;

  @Field(() => [JobProfileJobFamilyOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileJobFamilyOrderByWithAggregationInput>;

  @Field(() => [JobProfileJobFamilyScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileJobFamilyScalarFieldEnum>;

  @Field(() => JobProfileJobFamilyScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileJobFamilyScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileJobFamilyCountAggregateInput, { nullable: true })
  _count?: JobProfileJobFamilyCountAggregateInput;

  @Field(() => JobProfileJobFamilyAvgAggregateInput, { nullable: true })
  _avg?: JobProfileJobFamilyAvgAggregateInput;

  @Field(() => JobProfileJobFamilySumAggregateInput, { nullable: true })
  _sum?: JobProfileJobFamilySumAggregateInput;

  @Field(() => JobProfileJobFamilyMinAggregateInput, { nullable: true })
  _min?: JobProfileJobFamilyMinAggregateInput;

  @Field(() => JobProfileJobFamilyMaxAggregateInput, { nullable: true })
  _max?: JobProfileJobFamilyMaxAggregateInput;
}
