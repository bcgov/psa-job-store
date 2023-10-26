import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileOrderByRelationAggregateInput } from '../job-profile/job-profile-order-by-relation-aggregate.input';
import { JobCategoryOrderByRelevanceInput } from './job-category-order-by-relevance.input';

@InputType()
export class JobCategoryOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileOrderByRelationAggregateInput, { nullable: true })
  profiles?: JobProfileOrderByRelationAggregateInput;

  @Field(() => JobCategoryOrderByRelevanceInput, { nullable: true })
  _relevance?: JobCategoryOrderByRelevanceInput;
}
