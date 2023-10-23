import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class IdentityMinOrderByAggregateInput {
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

  @Field(() => SortOrder, { nullable: true })
  deleted_at?: keyof typeof SortOrder;
}
