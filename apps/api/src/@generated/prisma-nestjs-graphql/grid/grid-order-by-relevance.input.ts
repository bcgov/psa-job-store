import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GridOrderByRelevanceFieldEnum } from './grid-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class GridOrderByRelevanceInput {
  @Field(() => [GridOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof GridOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
