import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ClassificationOrderByRelevanceFieldEnum } from './classification-order-by-relevance-field.enum';

@InputType()
export class ClassificationOrderByRelevanceInput {
  @Field(() => [ClassificationOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof ClassificationOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
