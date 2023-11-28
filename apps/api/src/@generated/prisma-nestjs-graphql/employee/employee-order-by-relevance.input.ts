import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeOrderByRelevanceFieldEnum } from './employee-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class EmployeeOrderByRelevanceInput {
  @Field(() => [EmployeeOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof EmployeeOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
