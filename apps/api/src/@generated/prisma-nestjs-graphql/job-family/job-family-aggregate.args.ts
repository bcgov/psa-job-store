import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobFamilyWhereInput } from './job-family-where.input';
import { Type } from 'class-transformer';
import { JobFamilyOrderByWithRelationAndSearchRelevanceInput } from './job-family-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobFamilyWhereUniqueInput } from './job-family-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobFamilyCountAggregateInput } from './job-family-count-aggregate.input';
import { JobFamilyAvgAggregateInput } from './job-family-avg-aggregate.input';
import { JobFamilySumAggregateInput } from './job-family-sum-aggregate.input';
import { JobFamilyMinAggregateInput } from './job-family-min-aggregate.input';
import { JobFamilyMaxAggregateInput } from './job-family-max-aggregate.input';

@ArgsType()
export class JobFamilyAggregateArgs {
  @Field(() => JobFamilyWhereInput, { nullable: true })
  @Type(() => JobFamilyWhereInput)
  where?: JobFamilyWhereInput;

  @Field(() => [JobFamilyOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobFamilyOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobFamilyWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobFamilyWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobFamilyCountAggregateInput, { nullable: true })
  _count?: JobFamilyCountAggregateInput;

  @Field(() => JobFamilyAvgAggregateInput, { nullable: true })
  _avg?: JobFamilyAvgAggregateInput;

  @Field(() => JobFamilySumAggregateInput, { nullable: true })
  _sum?: JobFamilySumAggregateInput;

  @Field(() => JobFamilyMinAggregateInput, { nullable: true })
  _min?: JobFamilyMinAggregateInput;

  @Field(() => JobFamilyMaxAggregateInput, { nullable: true })
  _max?: JobFamilyMaxAggregateInput;
}
