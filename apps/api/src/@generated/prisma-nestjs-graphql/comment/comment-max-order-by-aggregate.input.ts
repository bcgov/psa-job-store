import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class CommentMaxOrderByAggregateInput {
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

  @Field(() => SortOrder, { nullable: true })
  deleted_at?: keyof typeof SortOrder;
}
