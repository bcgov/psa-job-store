import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobFamilyOrderByRelevanceInput } from './job-family-order-by-relevance.input';

@InputType()
export class JobFamilyOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobFamilyOrderByRelevanceInput, { nullable: true })
  _relevance?: JobFamilyOrderByRelevanceInput;
}
