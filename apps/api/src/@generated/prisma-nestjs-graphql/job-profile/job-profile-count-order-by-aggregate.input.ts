import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileCountOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  category_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  family_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  ministry_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  owner_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  parent_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  role_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  state?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  stream?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  number?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  context?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  overview?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  accountabilities?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  requirements?: keyof typeof SortOrder;
}
