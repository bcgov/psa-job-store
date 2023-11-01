import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CareerGroupOrderByRelevanceFieldEnum } from './career-group-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class CareerGroupOrderByRelevanceInput {
  @Field(() => [CareerGroupOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof CareerGroupOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
