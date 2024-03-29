import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupOrderByRelevanceFieldEnum } from './employee-group-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class EmployeeGroupOrderByRelevanceInput {
  @Field(() => [EmployeeGroupOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof EmployeeGroupOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
