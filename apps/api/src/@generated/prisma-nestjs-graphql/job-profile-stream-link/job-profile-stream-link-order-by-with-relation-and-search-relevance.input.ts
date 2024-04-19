import { Field, InputType } from '@nestjs/graphql';
import { JobProfileStreamOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-stream/job-profile-stream-order-by-with-relation-and-search-relevance.input';
import { JobProfileOrderByWithRelationAndSearchRelevanceInput } from '../job-profile/job-profile-order-by-with-relation-and-search-relevance.input';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileStreamLinkOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  jobProfileId?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  streamId?: keyof typeof SortOrder;

  @Field(() => JobProfileOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  jobProfile?: JobProfileOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileStreamOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  stream?: JobProfileStreamOrderByWithRelationAndSearchRelevanceInput;
}
