import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyAvgAggregateInput } from './job-profile-job-family-avg-aggregate.input';
import { JobProfileJobFamilyCountAggregateInput } from './job-profile-job-family-count-aggregate.input';
import { JobProfileJobFamilyMaxAggregateInput } from './job-profile-job-family-max-aggregate.input';
import { JobProfileJobFamilyMinAggregateInput } from './job-profile-job-family-min-aggregate.input';
import { JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput } from './job-profile-job-family-order-by-with-relation-and-search-relevance.input';
import { JobProfileJobFamilySumAggregateInput } from './job-profile-job-family-sum-aggregate.input';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';

@ArgsType()
export class JobProfileJobFamilyAggregateArgs {
  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  where?: JobProfileJobFamilyWhereInput;

  @Field(() => [JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileJobFamilyCountAggregateInput, { nullable: true })
  _count?: JobProfileJobFamilyCountAggregateInput;

  @Field(() => JobProfileJobFamilyAvgAggregateInput, { nullable: true })
  _avg?: JobProfileJobFamilyAvgAggregateInput;

  @Field(() => JobProfileJobFamilySumAggregateInput, { nullable: true })
  _sum?: JobProfileJobFamilySumAggregateInput;

  @Field(() => JobProfileJobFamilyMinAggregateInput, { nullable: true })
  _min?: JobProfileJobFamilyMinAggregateInput;

  @Field(() => JobProfileJobFamilyMaxAggregateInput, { nullable: true })
  _max?: JobProfileJobFamilyMaxAggregateInput;
}
