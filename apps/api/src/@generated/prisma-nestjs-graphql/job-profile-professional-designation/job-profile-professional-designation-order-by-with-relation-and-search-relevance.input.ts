import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileOrderByWithRelationAndSearchRelevanceInput } from '../job-profile/job-profile-order-by-with-relation-and-search-relevance.input';
import { ProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput } from '../professional-designation/professional-designation-order-by-with-relation-and-search-relevance.input';

@InputType()
export class JobProfileProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  professional_designation_id?: keyof typeof SortOrder;

  @Field(() => JobProfileOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  job_profile?: JobProfileOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => ProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  professional_designation?: ProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput;
}
