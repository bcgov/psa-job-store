import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IdentityOrderByRelevanceFieldEnum } from './identity-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class IdentityOrderByRelevanceInput {
  @Field(() => [IdentityOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof IdentityOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
