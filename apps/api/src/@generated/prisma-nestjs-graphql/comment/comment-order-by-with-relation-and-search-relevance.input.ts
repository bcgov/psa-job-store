import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UserOrderByWithRelationAndSearchRelevanceInput } from '../user/user-order-by-with-relation-and-search-relevance.input';
import { CommentOrderByRelevanceInput } from './comment-order-by-relevance.input';

@InputType()
export class CommentOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  author_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  record_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  record_type?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  text?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  created_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_at?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  deleted_at?: SortOrderInput;

  @Field(() => UserOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  author?: UserOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => CommentOrderByRelevanceInput, { nullable: true })
  _relevance?: CommentOrderByRelevanceInput;
}
