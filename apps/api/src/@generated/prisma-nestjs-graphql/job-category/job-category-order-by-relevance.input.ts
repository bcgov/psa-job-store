import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobCategoryOrderByRelevanceFieldEnum } from './job-category-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobCategoryOrderByRelevanceInput {
  @Field(() => [JobCategoryOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobCategoryOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
