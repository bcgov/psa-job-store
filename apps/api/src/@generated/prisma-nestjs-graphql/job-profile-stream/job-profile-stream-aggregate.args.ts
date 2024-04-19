import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamAvgAggregateInput } from './job-profile-stream-avg-aggregate.input';
import { JobProfileStreamCountAggregateInput } from './job-profile-stream-count-aggregate.input';
import { JobProfileStreamMaxAggregateInput } from './job-profile-stream-max-aggregate.input';
import { JobProfileStreamMinAggregateInput } from './job-profile-stream-min-aggregate.input';
import { JobProfileStreamOrderByWithRelationAndSearchRelevanceInput } from './job-profile-stream-order-by-with-relation-and-search-relevance.input';
import { JobProfileStreamSumAggregateInput } from './job-profile-stream-sum-aggregate.input';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';

@ArgsType()
export class JobProfileStreamAggregateArgs {
  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  where?: JobProfileStreamWhereInput;

  @Field(() => [JobProfileStreamOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileStreamOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;

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
