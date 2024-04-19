import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileMinimumRequirementsAvgAggregateInput } from './job-profile-minimum-requirements-avg-aggregate.input';
import { JobProfileMinimumRequirementsCountAggregateInput } from './job-profile-minimum-requirements-count-aggregate.input';
import { JobProfileMinimumRequirementsMaxAggregateInput } from './job-profile-minimum-requirements-max-aggregate.input';
import { JobProfileMinimumRequirementsMinAggregateInput } from './job-profile-minimum-requirements-min-aggregate.input';
import { JobProfileMinimumRequirementsOrderByWithRelationAndSearchRelevanceInput } from './job-profile-minimum-requirements-order-by-with-relation-and-search-relevance.input';
import { JobProfileMinimumRequirementsSumAggregateInput } from './job-profile-minimum-requirements-sum-aggregate.input';
import { JobProfileMinimumRequirementsWhereUniqueInput } from './job-profile-minimum-requirements-where-unique.input';
import { JobProfileMinimumRequirementsWhereInput } from './job-profile-minimum-requirements-where.input';

@ArgsType()
export class JobProfileMinimumRequirementsAggregateArgs {
  @Field(() => JobProfileMinimumRequirementsWhereInput, { nullable: true })
  @Type(() => JobProfileMinimumRequirementsWhereInput)
  where?: JobProfileMinimumRequirementsWhereInput;

  @Field(() => [JobProfileMinimumRequirementsOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileMinimumRequirementsOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileMinimumRequirementsWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileMinimumRequirementsWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileMinimumRequirementsCountAggregateInput, { nullable: true })
  _count?: JobProfileMinimumRequirementsCountAggregateInput;

  @Field(() => JobProfileMinimumRequirementsAvgAggregateInput, { nullable: true })
  _avg?: JobProfileMinimumRequirementsAvgAggregateInput;

  @Field(() => JobProfileMinimumRequirementsSumAggregateInput, { nullable: true })
  _sum?: JobProfileMinimumRequirementsSumAggregateInput;

  @Field(() => JobProfileMinimumRequirementsMinAggregateInput, { nullable: true })
  _min?: JobProfileMinimumRequirementsMinAggregateInput;

  @Field(() => JobProfileMinimumRequirementsMaxAggregateInput, { nullable: true })
  _max?: JobProfileMinimumRequirementsMaxAggregateInput;
}
