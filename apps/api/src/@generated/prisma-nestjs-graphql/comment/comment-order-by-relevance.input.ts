import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { CommentOrderByRelevanceFieldEnum } from './comment-order-by-relevance-field.enum';

@InputType()
export class CommentOrderByRelevanceInput {
  @Field(() => [CommentOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof CommentOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
