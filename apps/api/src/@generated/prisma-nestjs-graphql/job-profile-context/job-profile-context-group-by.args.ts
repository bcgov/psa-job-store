import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileContextWhereInput } from './job-profile-context-where.input';
import { Type } from 'class-transformer';
import { JobProfileContextOrderByWithAggregationInput } from './job-profile-context-order-by-with-aggregation.input';
import { JobProfileContextScalarFieldEnum } from './job-profile-context-scalar-field.enum';
import { JobProfileContextScalarWhereWithAggregatesInput } from './job-profile-context-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { JobProfileContextCountAggregateInput } from './job-profile-context-count-aggregate.input';
import { JobProfileContextAvgAggregateInput } from './job-profile-context-avg-aggregate.input';
import { JobProfileContextSumAggregateInput } from './job-profile-context-sum-aggregate.input';
import { JobProfileContextMinAggregateInput } from './job-profile-context-min-aggregate.input';
import { JobProfileContextMaxAggregateInput } from './job-profile-context-max-aggregate.input';

@ArgsType()
export class JobProfileContextGroupByArgs {
  @Field(() => JobProfileContextWhereInput, { nullable: true })
  @Type(() => JobProfileContextWhereInput)
  where?: JobProfileContextWhereInput;

  @Field(() => [JobProfileContextOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileContextOrderByWithAggregationInput>;

  @Field(() => [JobProfileContextScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileContextScalarFieldEnum>;

  @Field(() => JobProfileContextScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileContextScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileContextCountAggregateInput, { nullable: true })
  _count?: JobProfileContextCountAggregateInput;

  @Field(() => JobProfileContextAvgAggregateInput, { nullable: true })
  _avg?: JobProfileContextAvgAggregateInput;

  @Field(() => JobProfileContextSumAggregateInput, { nullable: true })
  _sum?: JobProfileContextSumAggregateInput;

  @Field(() => JobProfileContextMinAggregateInput, { nullable: true })
  _min?: JobProfileContextMinAggregateInput;

  @Field(() => JobProfileContextMaxAggregateInput, { nullable: true })
  _max?: JobProfileContextMaxAggregateInput;
}
