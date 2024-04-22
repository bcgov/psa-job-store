import { Field, InputType } from '@nestjs/graphql';
import { ClassificationOrderByWithRelationAndSearchRelevanceInput } from '../classification/classification-order-by-with-relation-and-search-relevance.input';
import { JobProfileOrderByWithRelationAndSearchRelevanceInput } from '../job-profile/job-profile-order-by-with-relation-and-search-relevance.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileClassificationOrderByRelevanceInput } from './job-profile-classification-order-by-relevance.input';

@InputType()
export class JobProfileClassificationOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => ClassificationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  classification?: ClassificationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  job_profile?: JobProfileOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileClassificationOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileClassificationOrderByRelevanceInput;
}
