import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileMinimumRequirementsOrderByRelevanceInput } from './job-profile-minimum-requirements-order-by-relevance.input';

@InputType()
export class JobProfileMinimumRequirementsOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  requirement?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  grade?: keyof typeof SortOrder;

  @Field(() => JobProfileMinimumRequirementsOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileMinimumRequirementsOrderByRelevanceInput;
}
