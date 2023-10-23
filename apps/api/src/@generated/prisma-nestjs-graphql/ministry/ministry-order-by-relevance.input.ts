import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MinistryOrderByRelevanceFieldEnum } from './ministry-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class MinistryOrderByRelevanceInput {
  @Field(() => [MinistryOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof MinistryOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
