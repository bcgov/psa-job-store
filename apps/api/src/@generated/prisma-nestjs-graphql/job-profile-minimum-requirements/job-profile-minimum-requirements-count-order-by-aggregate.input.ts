import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileMinimumRequirementsCountOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  requirement?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  grade?: keyof typeof SortOrder;
}
