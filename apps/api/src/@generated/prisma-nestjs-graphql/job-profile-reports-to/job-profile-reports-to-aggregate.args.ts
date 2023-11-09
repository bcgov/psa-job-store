import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileReportsToWhereInput } from './job-profile-reports-to-where.input';
import { Type } from 'class-transformer';
import { JobProfileReportsToOrderByWithRelationAndSearchRelevanceInput } from './job-profile-reports-to-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileReportsToCountAggregateInput } from './job-profile-reports-to-count-aggregate.input';
import { JobProfileReportsToAvgAggregateInput } from './job-profile-reports-to-avg-aggregate.input';
import { JobProfileReportsToSumAggregateInput } from './job-profile-reports-to-sum-aggregate.input';
import { JobProfileReportsToMinAggregateInput } from './job-profile-reports-to-min-aggregate.input';
import { JobProfileReportsToMaxAggregateInput } from './job-profile-reports-to-max-aggregate.input';

@ArgsType()
export class JobProfileReportsToAggregateArgs {
  @Field(() => JobProfileReportsToWhereInput, { nullable: true })
  @Type(() => JobProfileReportsToWhereInput)
  where?: JobProfileReportsToWhereInput;

  @Field(() => [JobProfileReportsToOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileReportsToOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileReportsToWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileReportsToCountAggregateInput, { nullable: true })
  _count?: JobProfileReportsToCountAggregateInput;

  @Field(() => JobProfileReportsToAvgAggregateInput, { nullable: true })
  _avg?: JobProfileReportsToAvgAggregateInput;

  @Field(() => JobProfileReportsToSumAggregateInput, { nullable: true })
  _sum?: JobProfileReportsToSumAggregateInput;

  @Field(() => JobProfileReportsToMinAggregateInput, { nullable: true })
  _min?: JobProfileReportsToMinAggregateInput;

  @Field(() => JobProfileReportsToMaxAggregateInput, { nullable: true })
  _max?: JobProfileReportsToMaxAggregateInput;
}
