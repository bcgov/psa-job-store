import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationOrderByRelevanceFieldEnum } from './location-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class LocationOrderByRelevanceInput {
  @Field(() => [LocationOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof LocationOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
