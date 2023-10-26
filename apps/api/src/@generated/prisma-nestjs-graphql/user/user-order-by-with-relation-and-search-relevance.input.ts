import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { CommentOrderByRelationAggregateInput } from '../comment/comment-order-by-relation-aggregate.input';
import { IdentityOrderByRelationAggregateInput } from '../identity/identity-order-by-relation-aggregate.input';
import { UserOrderByRelevanceInput } from './user-order-by-relevance.input';

@InputType()
export class UserOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  name?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  email?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  roles?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  created_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_at?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  deleted_at?: SortOrderInput;

  @Field(() => CommentOrderByRelationAggregateInput, { nullable: true })
  comments?: CommentOrderByRelationAggregateInput;

  @Field(() => IdentityOrderByRelationAggregateInput, { nullable: true })
  identities?: IdentityOrderByRelationAggregateInput;

  @Field(() => UserOrderByRelevanceInput, { nullable: true })
  _relevance?: UserOrderByRelevanceInput;
}
