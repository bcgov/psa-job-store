import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { BehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput } from '../behavioural-competency/behavioural-competency-order-by-with-relation-and-search-relevance.input';
import { JobProfileOrderByWithRelationAndSearchRelevanceInput } from '../job-profile/job-profile-order-by-with-relation-and-search-relevance.input';

@InputType()
export class JobProfileBehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  behavioural_competency_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => BehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  behavioral_competency?: BehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  job_profile?: JobProfileOrderByWithRelationAndSearchRelevanceInput;
}
