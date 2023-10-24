import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ClassificationOrderByWithRelationAndSearchRelevanceInput } from '../classification/classification-order-by-with-relation-and-search-relevance.input';
import { MinistryOrderByWithRelationAndSearchRelevanceInput } from '../ministry/ministry-order-by-with-relation-and-search-relevance.input';
import { JobProfileOrderByRelevanceInput } from './job-profile-order-by-relevance.input';

@InputType()
export class JobProfileOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  ministry_id?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  stream?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  number?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  context?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  overview?: keyof typeof SortOrder;

  @Field(() => ClassificationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  classification?: ClassificationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => MinistryOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  ministry?: MinistryOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileOrderByRelevanceInput;
}
