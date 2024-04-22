import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class PositionRequestSumOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  crm_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  crm_assigned_to_account_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  step?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  parent_job_profile_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  position_number?: keyof typeof SortOrder;
}
