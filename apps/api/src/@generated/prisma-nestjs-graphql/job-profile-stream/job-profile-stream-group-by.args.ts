import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamAvgAggregateInput } from './job-profile-stream-avg-aggregate.input';
import { JobProfileStreamCountAggregateInput } from './job-profile-stream-count-aggregate.input';
import { JobProfileStreamMaxAggregateInput } from './job-profile-stream-max-aggregate.input';
import { JobProfileStreamMinAggregateInput } from './job-profile-stream-min-aggregate.input';
import { JobProfileStreamOrderByWithAggregationInput } from './job-profile-stream-order-by-with-aggregation.input';
import { JobProfileStreamScalarFieldEnum } from './job-profile-stream-scalar-field.enum';
import { JobProfileStreamScalarWhereWithAggregatesInput } from './job-profile-stream-scalar-where-with-aggregates.input';
import { JobProfileStreamSumAggregateInput } from './job-profile-stream-sum-aggregate.input';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';

@ArgsType()
export class JobProfileStreamGroupByArgs {
  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  where?: JobProfileStreamWhereInput;

  @Field(() => [JobProfileStreamOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileStreamOrderByWithAggregationInput>;

  @Field(() => [JobProfileStreamScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileStreamScalarFieldEnum>;

  @Field(() => JobProfileStreamScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileStreamScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileStreamCountAggregateInput, { nullable: true })
  _count?: JobProfileStreamCountAggregateInput;

  @Field(() => JobProfileStreamAvgAggregateInput, { nullable: true })
  _avg?: JobProfileStreamAvgAggregateInput;

  @Field(() => JobProfileStreamSumAggregateInput, { nullable: true })
  _sum?: JobProfileStreamSumAggregateInput;

  @Field(() => JobProfileStreamMinAggregateInput, { nullable: true })
  _min?: JobProfileStreamMinAggregateInput;

  @Field(() => JobProfileStreamMaxAggregateInput, { nullable: true })
  _max?: JobProfileStreamMaxAggregateInput;
}
