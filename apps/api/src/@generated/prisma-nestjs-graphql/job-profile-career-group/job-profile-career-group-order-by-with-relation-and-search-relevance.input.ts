import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileOrderByRelationAggregateInput } from '../job-profile/job-profile-order-by-relation-aggregate.input';
import { JobProfileCareerGroupOrderByRelevanceInput } from './job-profile-career-group-order-by-relevance.input';

@InputType()
export class JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileOrderByRelationAggregateInput;

  @Field(() => JobProfileCareerGroupOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileCareerGroupOrderByRelevanceInput;
}
