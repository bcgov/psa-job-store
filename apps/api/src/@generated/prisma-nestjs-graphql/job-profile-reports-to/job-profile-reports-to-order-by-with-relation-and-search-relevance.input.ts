import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ClassificationOrderByWithRelationAndSearchRelevanceInput } from '../classification/classification-order-by-with-relation-and-search-relevance.input';
import { JobProfileOrderByWithRelationAndSearchRelevanceInput } from '../job-profile/job-profile-order-by-with-relation-and-search-relevance.input';

@InputType()
export class JobProfileReportsToOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => ClassificationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  classification?: ClassificationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  job_profile?: JobProfileOrderByWithRelationAndSearchRelevanceInput;
}
