import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';
import { Type } from 'class-transformer';
import { JobProfileScopeOrderByWithRelationAndSearchRelevanceInput } from './job-profile-scope-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileScopeWhereUniqueInput } from './job-profile-scope-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileScopeCountAggregateInput } from './job-profile-scope-count-aggregate.input';
import { JobProfileScopeAvgAggregateInput } from './job-profile-scope-avg-aggregate.input';
import { JobProfileScopeSumAggregateInput } from './job-profile-scope-sum-aggregate.input';
import { JobProfileScopeMinAggregateInput } from './job-profile-scope-min-aggregate.input';
import { JobProfileScopeMaxAggregateInput } from './job-profile-scope-max-aggregate.input';

@ArgsType()
export class JobProfileScopeAggregateArgs {
  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  @Type(() => JobProfileScopeWhereInput)
  where?: JobProfileScopeWhereInput;

  @Field(() => [JobProfileScopeOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileScopeOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileScopeWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileScopeWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileScopeCountAggregateInput, { nullable: true })
  _count?: JobProfileScopeCountAggregateInput;

  @Field(() => JobProfileScopeAvgAggregateInput, { nullable: true })
  _avg?: JobProfileScopeAvgAggregateInput;

  @Field(() => JobProfileScopeSumAggregateInput, { nullable: true })
  _sum?: JobProfileScopeSumAggregateInput;

  @Field(() => JobProfileScopeMinAggregateInput, { nullable: true })
  _min?: JobProfileScopeMinAggregateInput;

  @Field(() => JobProfileScopeMaxAggregateInput, { nullable: true })
  _max?: JobProfileScopeMaxAggregateInput;
}
