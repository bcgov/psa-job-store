import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyAvgAggregateInput } from './job-profile-behavioural-competency-avg-aggregate.input';
import { JobProfileBehaviouralCompetencyCountAggregateInput } from './job-profile-behavioural-competency-count-aggregate.input';
import { JobProfileBehaviouralCompetencyMaxAggregateInput } from './job-profile-behavioural-competency-max-aggregate.input';
import { JobProfileBehaviouralCompetencyMinAggregateInput } from './job-profile-behavioural-competency-min-aggregate.input';
import { JobProfileBehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput } from './job-profile-behavioural-competency-order-by-with-relation-and-search-relevance.input';
import { JobProfileBehaviouralCompetencySumAggregateInput } from './job-profile-behavioural-competency-sum-aggregate.input';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';
import { JobProfileBehaviouralCompetencyWhereInput } from './job-profile-behavioural-competency-where.input';

@ArgsType()
export class JobProfileBehaviouralCompetencyAggregateArgs {
  @Field(() => JobProfileBehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyWhereInput)
  where?: JobProfileBehaviouralCompetencyWhereInput;

  @Field(() => [JobProfileBehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileBehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileBehaviouralCompetencyWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileBehaviouralCompetencyCountAggregateInput, { nullable: true })
  _count?: JobProfileBehaviouralCompetencyCountAggregateInput;

  @Field(() => JobProfileBehaviouralCompetencyAvgAggregateInput, { nullable: true })
  _avg?: JobProfileBehaviouralCompetencyAvgAggregateInput;

  @Field(() => JobProfileBehaviouralCompetencySumAggregateInput, { nullable: true })
  _sum?: JobProfileBehaviouralCompetencySumAggregateInput;

  @Field(() => JobProfileBehaviouralCompetencyMinAggregateInput, { nullable: true })
  _min?: JobProfileBehaviouralCompetencyMinAggregateInput;

  @Field(() => JobProfileBehaviouralCompetencyMaxAggregateInput, { nullable: true })
  _max?: JobProfileBehaviouralCompetencyMaxAggregateInput;
}
