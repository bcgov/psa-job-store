import { Field, InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-job-family/job-profile-job-family-order-by-with-relation-and-search-relevance.input';
import { JobProfileStreamLinkOrderByRelationAggregateInput } from '../job-profile-stream-link/job-profile-stream-link-order-by-relation-aggregate.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileStreamOrderByRelevanceInput } from './job-profile-stream-order-by-relevance.input';

@InputType()
export class JobProfileStreamOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_family_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  job_family?: JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileStreamLinkOrderByRelationAggregateInput, { nullable: true })
  jobProfiles?: JobProfileStreamLinkOrderByRelationAggregateInput;

  @Field(() => JobProfileStreamOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileStreamOrderByRelevanceInput;
}
