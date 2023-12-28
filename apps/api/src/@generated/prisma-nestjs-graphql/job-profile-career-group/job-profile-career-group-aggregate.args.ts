import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileCareerGroupWhereInput } from './job-profile-career-group-where.input';
import { Type } from 'class-transformer';
import { JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput } from './job-profile-career-group-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileCareerGroupWhereUniqueInput } from './job-profile-career-group-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileCareerGroupCountAggregateInput } from './job-profile-career-group-count-aggregate.input';
import { JobProfileCareerGroupAvgAggregateInput } from './job-profile-career-group-avg-aggregate.input';
import { JobProfileCareerGroupSumAggregateInput } from './job-profile-career-group-sum-aggregate.input';
import { JobProfileCareerGroupMinAggregateInput } from './job-profile-career-group-min-aggregate.input';
import { JobProfileCareerGroupMaxAggregateInput } from './job-profile-career-group-max-aggregate.input';

@ArgsType()
export class JobProfileCareerGroupAggregateArgs {
  @Field(() => JobProfileCareerGroupWhereInput, { nullable: true })
  @Type(() => JobProfileCareerGroupWhereInput)
  where?: JobProfileCareerGroupWhereInput;

  @Field(() => [JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileCareerGroupWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileCareerGroupWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileCareerGroupCountAggregateInput, { nullable: true })
  _count?: JobProfileCareerGroupCountAggregateInput;

  @Field(() => JobProfileCareerGroupAvgAggregateInput, { nullable: true })
  _avg?: JobProfileCareerGroupAvgAggregateInput;

  @Field(() => JobProfileCareerGroupSumAggregateInput, { nullable: true })
  _sum?: JobProfileCareerGroupSumAggregateInput;

  @Field(() => JobProfileCareerGroupMinAggregateInput, { nullable: true })
  _min?: JobProfileCareerGroupMinAggregateInput;

  @Field(() => JobProfileCareerGroupMaxAggregateInput, { nullable: true })
  _max?: JobProfileCareerGroupMaxAggregateInput;
}
