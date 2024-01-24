import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { Type } from 'class-transformer';
import { JobProfileOrderByWithRelationAndSearchRelevanceInput } from './job-profile-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileCountAggregateInput } from './job-profile-count-aggregate.input';
import { JobProfileAvgAggregateInput } from './job-profile-avg-aggregate.input';
import { JobProfileSumAggregateInput } from './job-profile-sum-aggregate.input';
import { JobProfileMinAggregateInput } from './job-profile-min-aggregate.input';
import { JobProfileMaxAggregateInput } from './job-profile-max-aggregate.input';

@ArgsType()
export class JobProfileAggregateArgs {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => [JobProfileOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileCountAggregateInput, { nullable: true })
  _count?: JobProfileCountAggregateInput;

  @Field(() => JobProfileAvgAggregateInput, { nullable: true })
  _avg?: JobProfileAvgAggregateInput;

  @Field(() => JobProfileSumAggregateInput, { nullable: true })
  _sum?: JobProfileSumAggregateInput;

  @Field(() => JobProfileMinAggregateInput, { nullable: true })
  _min?: JobProfileMinAggregateInput;

  @Field(() => JobProfileMaxAggregateInput, { nullable: true })
  _max?: JobProfileMaxAggregateInput;
}
