import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentOrderByRelevanceFieldEnum } from './department-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class DepartmentOrderByRelevanceInput {
  @Field(() => [DepartmentOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof DepartmentOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
