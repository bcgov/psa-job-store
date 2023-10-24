import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UserOrderByWithRelationAndSearchRelevanceInput } from '../user/user-order-by-with-relation-and-search-relevance.input';
import { IdentityOrderByRelevanceInput } from './identity-order-by-relevance.input';

@InputType()
export class IdentityOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  sub?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  identity_provider?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  user_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  created_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_at?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  deleted_at?: SortOrderInput;

  @Field(() => UserOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  user?: UserOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => IdentityOrderByRelevanceInput, { nullable: true })
  _relevance?: IdentityOrderByRelevanceInput;
}
