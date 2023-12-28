import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileBehaviouralCompetencyOrderByRelationAggregateInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-order-by-relation-aggregate.input';
import { BehaviouralCompetencyOrderByRelevanceInput } from './behavioural-competency-order-by-relevance.input';

@InputType()
export class BehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  type?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  category?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder;

  @Field(() => JobProfileBehaviouralCompetencyOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileBehaviouralCompetencyOrderByRelationAggregateInput;

  @Field(() => BehaviouralCompetencyOrderByRelevanceInput, { nullable: true })
  _relevance?: BehaviouralCompetencyOrderByRelevanceInput;
}
