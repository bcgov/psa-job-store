import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { PositionRequestOrderByRelevanceFieldEnum } from './position-request-order-by-relevance-field.enum';

@InputType()
export class PositionRequestOrderByRelevanceInput {
  @Field(() => [PositionRequestOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof PositionRequestOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
