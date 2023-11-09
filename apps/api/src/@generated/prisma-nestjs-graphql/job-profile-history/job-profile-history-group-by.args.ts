import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileHistoryWhereInput } from './job-profile-history-where.input';
import { Type } from 'class-transformer';
import { JobProfileHistoryOrderByWithAggregationInput } from './job-profile-history-order-by-with-aggregation.input';
import { JobProfileHistoryScalarFieldEnum } from './job-profile-history-scalar-field.enum';
import { JobProfileHistoryScalarWhereWithAggregatesInput } from './job-profile-history-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { JobProfileHistoryCountAggregateInput } from './job-profile-history-count-aggregate.input';
import { JobProfileHistoryAvgAggregateInput } from './job-profile-history-avg-aggregate.input';
import { JobProfileHistorySumAggregateInput } from './job-profile-history-sum-aggregate.input';
import { JobProfileHistoryMinAggregateInput } from './job-profile-history-min-aggregate.input';
import { JobProfileHistoryMaxAggregateInput } from './job-profile-history-max-aggregate.input';

@ArgsType()
export class JobProfileHistoryGroupByArgs {
  @Field(() => JobProfileHistoryWhereInput, { nullable: true })
  @Type(() => JobProfileHistoryWhereInput)
  where?: JobProfileHistoryWhereInput;

  @Field(() => [JobProfileHistoryOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileHistoryOrderByWithAggregationInput>;

  @Field(() => [JobProfileHistoryScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileHistoryScalarFieldEnum>;

  @Field(() => JobProfileHistoryScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileHistoryScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileHistoryCountAggregateInput, { nullable: true })
  _count?: JobProfileHistoryCountAggregateInput;

  @Field(() => JobProfileHistoryAvgAggregateInput, { nullable: true })
  _avg?: JobProfileHistoryAvgAggregateInput;

  @Field(() => JobProfileHistorySumAggregateInput, { nullable: true })
  _sum?: JobProfileHistorySumAggregateInput;

  @Field(() => JobProfileHistoryMinAggregateInput, { nullable: true })
  _min?: JobProfileHistoryMinAggregateInput;

  @Field(() => JobProfileHistoryMaxAggregateInput, { nullable: true })
  _max?: JobProfileHistoryMaxAggregateInput;
}
