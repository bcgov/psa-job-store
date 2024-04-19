import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileOrganizationAvgAggregateInput } from './job-profile-organization-avg-aggregate.input';
import { JobProfileOrganizationCountAggregateInput } from './job-profile-organization-count-aggregate.input';
import { JobProfileOrganizationMaxAggregateInput } from './job-profile-organization-max-aggregate.input';
import { JobProfileOrganizationMinAggregateInput } from './job-profile-organization-min-aggregate.input';
import { JobProfileOrganizationOrderByWithRelationAndSearchRelevanceInput } from './job-profile-organization-order-by-with-relation-and-search-relevance.input';
import { JobProfileOrganizationSumAggregateInput } from './job-profile-organization-sum-aggregate.input';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';
import { JobProfileOrganizationWhereInput } from './job-profile-organization-where.input';

@ArgsType()
export class JobProfileOrganizationAggregateArgs {
  @Field(() => JobProfileOrganizationWhereInput, { nullable: true })
  @Type(() => JobProfileOrganizationWhereInput)
  where?: JobProfileOrganizationWhereInput;

  @Field(() => [JobProfileOrganizationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileOrganizationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileOrganizationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileOrganizationCountAggregateInput, { nullable: true })
  _count?: JobProfileOrganizationCountAggregateInput;

  @Field(() => JobProfileOrganizationAvgAggregateInput, { nullable: true })
  _avg?: JobProfileOrganizationAvgAggregateInput;

  @Field(() => JobProfileOrganizationSumAggregateInput, { nullable: true })
  _sum?: JobProfileOrganizationSumAggregateInput;

  @Field(() => JobProfileOrganizationMinAggregateInput, { nullable: true })
  _min?: JobProfileOrganizationMinAggregateInput;

  @Field(() => JobProfileOrganizationMaxAggregateInput, { nullable: true })
  _max?: JobProfileOrganizationMaxAggregateInput;
}
