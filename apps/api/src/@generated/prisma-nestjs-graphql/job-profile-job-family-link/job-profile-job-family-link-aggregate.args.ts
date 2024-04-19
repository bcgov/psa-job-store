import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkAvgAggregateInput } from './job-profile-job-family-link-avg-aggregate.input';
import { JobProfileJobFamilyLinkCountAggregateInput } from './job-profile-job-family-link-count-aggregate.input';
import { JobProfileJobFamilyLinkMaxAggregateInput } from './job-profile-job-family-link-max-aggregate.input';
import { JobProfileJobFamilyLinkMinAggregateInput } from './job-profile-job-family-link-min-aggregate.input';
import { JobProfileJobFamilyLinkOrderByWithRelationAndSearchRelevanceInput } from './job-profile-job-family-link-order-by-with-relation-and-search-relevance.input';
import { JobProfileJobFamilyLinkSumAggregateInput } from './job-profile-job-family-link-sum-aggregate.input';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';
import { JobProfileJobFamilyLinkWhereInput } from './job-profile-job-family-link-where.input';

@ArgsType()
export class JobProfileJobFamilyLinkAggregateArgs {
  @Field(() => JobProfileJobFamilyLinkWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyLinkWhereInput)
  where?: JobProfileJobFamilyLinkWhereInput;

  @Field(() => [JobProfileJobFamilyLinkOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileJobFamilyLinkOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileJobFamilyLinkWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileJobFamilyLinkCountAggregateInput, { nullable: true })
  _count?: JobProfileJobFamilyLinkCountAggregateInput;

  @Field(() => JobProfileJobFamilyLinkAvgAggregateInput, { nullable: true })
  _avg?: JobProfileJobFamilyLinkAvgAggregateInput;

  @Field(() => JobProfileJobFamilyLinkSumAggregateInput, { nullable: true })
  _sum?: JobProfileJobFamilyLinkSumAggregateInput;

  @Field(() => JobProfileJobFamilyLinkMinAggregateInput, { nullable: true })
  _min?: JobProfileJobFamilyLinkMinAggregateInput;

  @Field(() => JobProfileJobFamilyLinkMaxAggregateInput, { nullable: true })
  _max?: JobProfileJobFamilyLinkMaxAggregateInput;
}
