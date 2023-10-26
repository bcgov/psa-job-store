import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileReportsToWhereInput } from './job-profile-reports-to-where.input';
import { Type } from 'class-transformer';
import { JobProfileReportsToOrderByWithAggregationInput } from './job-profile-reports-to-order-by-with-aggregation.input';
import { JobProfileReportsToScalarFieldEnum } from './job-profile-reports-to-scalar-field.enum';
import { JobProfileReportsToScalarWhereWithAggregatesInput } from './job-profile-reports-to-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { JobProfileReportsToCountAggregateInput } from './job-profile-reports-to-count-aggregate.input';
import { JobProfileReportsToAvgAggregateInput } from './job-profile-reports-to-avg-aggregate.input';
import { JobProfileReportsToSumAggregateInput } from './job-profile-reports-to-sum-aggregate.input';
import { JobProfileReportsToMinAggregateInput } from './job-profile-reports-to-min-aggregate.input';
import { JobProfileReportsToMaxAggregateInput } from './job-profile-reports-to-max-aggregate.input';

@ArgsType()
export class JobProfileReportsToGroupByArgs {
  @Field(() => JobProfileReportsToWhereInput, { nullable: true })
  @Type(() => JobProfileReportsToWhereInput)
  where?: JobProfileReportsToWhereInput;

  @Field(() => [JobProfileReportsToOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileReportsToOrderByWithAggregationInput>;

  @Field(() => [JobProfileReportsToScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileReportsToScalarFieldEnum>;

  @Field(() => JobProfileReportsToScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileReportsToScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileReportsToCountAggregateInput, { nullable: true })
  _count?: JobProfileReportsToCountAggregateInput;

  @Field(() => JobProfileReportsToAvgAggregateInput, { nullable: true })
  _avg?: JobProfileReportsToAvgAggregateInput;

  @Field(() => JobProfileReportsToSumAggregateInput, { nullable: true })
  _sum?: JobProfileReportsToSumAggregateInput;

  @Field(() => JobProfileReportsToMinAggregateInput, { nullable: true })
  _min?: JobProfileReportsToMinAggregateInput;

  @Field(() => JobProfileReportsToMaxAggregateInput, { nullable: true })
  _max?: JobProfileReportsToMaxAggregateInput;
}
