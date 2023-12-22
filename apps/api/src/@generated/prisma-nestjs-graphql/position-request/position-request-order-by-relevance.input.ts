import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestOrderByRelevanceFieldEnum } from './position-request-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class PositionRequestOrderByRelevanceInput {
  @Field(() => [PositionRequestOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof PositionRequestOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
