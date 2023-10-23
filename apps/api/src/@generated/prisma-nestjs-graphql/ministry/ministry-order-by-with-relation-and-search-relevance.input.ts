import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileOrderByRelationAggregateInput } from '../job-profile/job-profile-order-by-relation-aggregate.input';
import { MinistryOrderByRelevanceInput } from './ministry-order-by-relevance.input';

@InputType()
export class MinistryOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  code?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileOrderByRelationAggregateInput;

  @Field(() => MinistryOrderByRelevanceInput, { nullable: true })
  _relevance?: MinistryOrderByRelevanceInput;
}
