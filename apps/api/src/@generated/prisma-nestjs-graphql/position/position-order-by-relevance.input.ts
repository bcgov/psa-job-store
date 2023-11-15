import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionOrderByRelevanceFieldEnum } from './position-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class PositionOrderByRelevanceInput {
  @Field(() => [PositionOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof PositionOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
