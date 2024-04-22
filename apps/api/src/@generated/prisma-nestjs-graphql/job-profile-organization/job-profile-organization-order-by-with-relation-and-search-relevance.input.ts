import { Field, InputType } from '@nestjs/graphql';
import { JobProfileOrderByWithRelationAndSearchRelevanceInput } from '../job-profile/job-profile-order-by-with-relation-and-search-relevance.input';
import { OrganizationOrderByWithRelationAndSearchRelevanceInput } from '../organization/organization-order-by-with-relation-and-search-relevance.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileOrganizationOrderByRelevanceInput } from './job-profile-organization-order-by-relevance.input';

@InputType()
export class JobProfileOrganizationOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  organization_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => OrganizationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  organization?: OrganizationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  job_profile?: JobProfileOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileOrganizationOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileOrganizationOrderByRelevanceInput;
}
