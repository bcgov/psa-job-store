import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileOrderByWithRelationAndSearchRelevanceInput } from '../job-profile/job-profile-order-by-with-relation-and-search-relevance.input';
import { JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-job-family/job-profile-job-family-order-by-with-relation-and-search-relevance.input';

@InputType()
export class JobProfileJobFamilyLinkOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  jobProfileId?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  jobFamilyId?: keyof typeof SortOrder;

  @Field(() => JobProfileOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  jobProfile?: JobProfileOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  jobFamily?: JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput;
}
