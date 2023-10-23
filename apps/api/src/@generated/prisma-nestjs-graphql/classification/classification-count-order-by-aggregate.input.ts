import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ClassificationCountOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  grid_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  occupation_group_id?: keyof typeof SortOrder;
}
