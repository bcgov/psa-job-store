import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { EmployeeGroupOrderByRelevanceFieldEnum } from './employee-group-order-by-relevance-field.enum';

@InputType()
export class EmployeeGroupOrderByRelevanceInput {
  @Field(() => [EmployeeGroupOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof EmployeeGroupOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
