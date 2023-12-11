import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class PositionRequestMaxOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  step?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  reports_to_position_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  parent_job_profile_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  user_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  position_number?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  submission_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  status?: keyof typeof SortOrder;
}
