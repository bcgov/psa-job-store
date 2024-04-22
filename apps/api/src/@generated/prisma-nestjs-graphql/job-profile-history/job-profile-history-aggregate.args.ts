import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileHistoryAvgAggregateInput } from './job-profile-history-avg-aggregate.input';
import { JobProfileHistoryCountAggregateInput } from './job-profile-history-count-aggregate.input';
import { JobProfileHistoryMaxAggregateInput } from './job-profile-history-max-aggregate.input';
import { JobProfileHistoryMinAggregateInput } from './job-profile-history-min-aggregate.input';
import { JobProfileHistoryOrderByWithRelationAndSearchRelevanceInput } from './job-profile-history-order-by-with-relation-and-search-relevance.input';
import { JobProfileHistorySumAggregateInput } from './job-profile-history-sum-aggregate.input';
import { JobProfileHistoryWhereUniqueInput } from './job-profile-history-where-unique.input';
import { JobProfileHistoryWhereInput } from './job-profile-history-where.input';

@ArgsType()
export class JobProfileHistoryAggregateArgs {
  @Field(() => JobProfileHistoryWhereInput, { nullable: true })
  @Type(() => JobProfileHistoryWhereInput)
  where?: JobProfileHistoryWhereInput;

  @Field(() => [JobProfileHistoryOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileHistoryOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileHistoryWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileHistoryWhereUniqueInput, 'id'>;

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
