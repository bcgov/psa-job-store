import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserOrderByRelevanceFieldEnum } from './user-order-by-relevance-field.enum';

@InputType()
export class UserOrderByRelevanceInput {
  @Field(() => [UserOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof UserOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
