import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { JobProfileBehaviouralCompetencyOrderByRelationAggregateInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-order-by-relation-aggregate.input';
import { MinistryOrderByWithRelationAndSearchRelevanceInput } from '../ministry/ministry-order-by-with-relation-and-search-relevance.input';
import { BehaviouralCompetencyOrderByRelevanceInput } from './behavioural-competency-order-by-relevance.input';

@InputType()
export class BehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  ministry_id?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  membership?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  group?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder;

  @Field(() => JobProfileBehaviouralCompetencyOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileBehaviouralCompetencyOrderByRelationAggregateInput;

  @Field(() => MinistryOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  ministry?: MinistryOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => BehaviouralCompetencyOrderByRelevanceInput, { nullable: true })
  _relevance?: BehaviouralCompetencyOrderByRelevanceInput;
}
