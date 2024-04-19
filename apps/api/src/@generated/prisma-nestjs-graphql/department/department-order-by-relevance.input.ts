import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { DepartmentOrderByRelevanceFieldEnum } from './department-order-by-relevance-field.enum';

@InputType()
export class DepartmentOrderByRelevanceInput {
  @Field(() => [DepartmentOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof DepartmentOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
