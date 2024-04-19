import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkAvgAggregateInput } from './job-profile-stream-link-avg-aggregate.input';
import { JobProfileStreamLinkCountAggregateInput } from './job-profile-stream-link-count-aggregate.input';
import { JobProfileStreamLinkMaxAggregateInput } from './job-profile-stream-link-max-aggregate.input';
import { JobProfileStreamLinkMinAggregateInput } from './job-profile-stream-link-min-aggregate.input';
import { JobProfileStreamLinkOrderByWithRelationAndSearchRelevanceInput } from './job-profile-stream-link-order-by-with-relation-and-search-relevance.input';
import { JobProfileStreamLinkSumAggregateInput } from './job-profile-stream-link-sum-aggregate.input';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';
import { JobProfileStreamLinkWhereInput } from './job-profile-stream-link-where.input';

@ArgsType()
export class JobProfileStreamLinkAggregateArgs {
  @Field(() => JobProfileStreamLinkWhereInput, { nullable: true })
  @Type(() => JobProfileStreamLinkWhereInput)
  where?: JobProfileStreamLinkWhereInput;

  @Field(() => [JobProfileStreamLinkOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileStreamLinkOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileStreamLinkWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;

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
