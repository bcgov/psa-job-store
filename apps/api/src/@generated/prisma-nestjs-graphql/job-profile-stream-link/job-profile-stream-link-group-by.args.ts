import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkAvgAggregateInput } from './job-profile-stream-link-avg-aggregate.input';
import { JobProfileStreamLinkCountAggregateInput } from './job-profile-stream-link-count-aggregate.input';
import { JobProfileStreamLinkMaxAggregateInput } from './job-profile-stream-link-max-aggregate.input';
import { JobProfileStreamLinkMinAggregateInput } from './job-profile-stream-link-min-aggregate.input';
import { JobProfileStreamLinkOrderByWithAggregationInput } from './job-profile-stream-link-order-by-with-aggregation.input';
import { JobProfileStreamLinkScalarFieldEnum } from './job-profile-stream-link-scalar-field.enum';
import { JobProfileStreamLinkScalarWhereWithAggregatesInput } from './job-profile-stream-link-scalar-where-with-aggregates.input';
import { JobProfileStreamLinkSumAggregateInput } from './job-profile-stream-link-sum-aggregate.input';
import { JobProfileStreamLinkWhereInput } from './job-profile-stream-link-where.input';

@ArgsType()
export class JobProfileStreamLinkGroupByArgs {
  @Field(() => JobProfileStreamLinkWhereInput, { nullable: true })
  @Type(() => JobProfileStreamLinkWhereInput)
  where?: JobProfileStreamLinkWhereInput;

  @Field(() => [JobProfileStreamLinkOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileStreamLinkOrderByWithAggregationInput>;

  @Field(() => [JobProfileStreamLinkScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileStreamLinkScalarFieldEnum>;

  @Field(() => JobProfileStreamLinkScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileStreamLinkScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileStreamLinkCountAggregateInput, { nullable: true })
  _count?: JobProfileStreamLinkCountAggregateInput;

  @Field(() => JobProfileStreamLinkAvgAggregateInput, { nullable: true })
  _avg?: JobProfileStreamLinkAvgAggregateInput;

  @Field(() => JobProfileStreamLinkSumAggregateInput, { nullable: true })
  _sum?: JobProfileStreamLinkSumAggregateInput;

  @Field(() => JobProfileStreamLinkMinAggregateInput, { nullable: true })
  _min?: JobProfileStreamLinkMinAggregateInput;

  @Field(() => JobProfileStreamLinkMaxAggregateInput, { nullable: true })
  _max?: JobProfileStreamLinkMaxAggregateInput;
}
