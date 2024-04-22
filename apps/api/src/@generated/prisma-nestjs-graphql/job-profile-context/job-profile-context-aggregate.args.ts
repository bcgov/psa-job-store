import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileContextAvgAggregateInput } from './job-profile-context-avg-aggregate.input';
import { JobProfileContextCountAggregateInput } from './job-profile-context-count-aggregate.input';
import { JobProfileContextMaxAggregateInput } from './job-profile-context-max-aggregate.input';
import { JobProfileContextMinAggregateInput } from './job-profile-context-min-aggregate.input';
import { JobProfileContextOrderByWithRelationAndSearchRelevanceInput } from './job-profile-context-order-by-with-relation-and-search-relevance.input';
import { JobProfileContextSumAggregateInput } from './job-profile-context-sum-aggregate.input';
import { JobProfileContextWhereUniqueInput } from './job-profile-context-where-unique.input';
import { JobProfileContextWhereInput } from './job-profile-context-where.input';

@ArgsType()
export class JobProfileContextAggregateArgs {
  @Field(() => JobProfileContextWhereInput, { nullable: true })
  @Type(() => JobProfileContextWhereInput)
  where?: JobProfileContextWhereInput;

  @Field(() => [JobProfileContextOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileContextOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileContextWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileContextWhereUniqueInput, 'id' | 'job_profile_id'>;

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
