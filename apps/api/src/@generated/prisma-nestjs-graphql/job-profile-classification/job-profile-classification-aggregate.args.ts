import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileClassificationWhereInput } from './job-profile-classification-where.input';
import { Type } from 'class-transformer';
import { JobProfileClassificationOrderByWithRelationAndSearchRelevanceInput } from './job-profile-classification-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileClassificationCountAggregateInput } from './job-profile-classification-count-aggregate.input';
import { JobProfileClassificationAvgAggregateInput } from './job-profile-classification-avg-aggregate.input';
import { JobProfileClassificationSumAggregateInput } from './job-profile-classification-sum-aggregate.input';
import { JobProfileClassificationMinAggregateInput } from './job-profile-classification-min-aggregate.input';
import { JobProfileClassificationMaxAggregateInput } from './job-profile-classification-max-aggregate.input';

@ArgsType()
export class JobProfileClassificationAggregateArgs {
  @Field(() => JobProfileClassificationWhereInput, { nullable: true })
  @Type(() => JobProfileClassificationWhereInput)
  where?: JobProfileClassificationWhereInput;

  @Field(() => [JobProfileClassificationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileClassificationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileClassificationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileClassificationCountAggregateInput, { nullable: true })
  _count?: JobProfileClassificationCountAggregateInput;

  @Field(() => JobProfileClassificationAvgAggregateInput, { nullable: true })
  _avg?: JobProfileClassificationAvgAggregateInput;

  @Field(() => JobProfileClassificationSumAggregateInput, { nullable: true })
  _sum?: JobProfileClassificationSumAggregateInput;

  @Field(() => JobProfileClassificationMinAggregateInput, { nullable: true })
  _min?: JobProfileClassificationMinAggregateInput;

  @Field(() => JobProfileClassificationMaxAggregateInput, { nullable: true })
  _max?: JobProfileClassificationMaxAggregateInput;
}
