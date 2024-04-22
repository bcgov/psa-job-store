import { Field, InputType } from '@nestjs/graphql';
import { JobProfileOrderByWithRelationAndSearchRelevanceInput } from '../job-profile/job-profile-order-by-with-relation-and-search-relevance.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileContextOrderByRelevanceInput } from './job-profile-context-order-by-relevance.input';

@InputType()
export class JobProfileContextOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  description?: keyof typeof SortOrder;

  @Field(() => JobProfileOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  job_profile?: JobProfileOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileContextOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileContextOrderByRelevanceInput;
}
