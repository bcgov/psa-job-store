import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class PositionRequestCountOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  crm_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  crm_assigned_to_account_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  step?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  reports_to_position_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  department_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  parent_job_profile_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  crm_json?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  profile_json?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  orgchart_json?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  user_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  position_number?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  classification_code?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  user_name?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  email?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  submission_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  submitted_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  approved_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  status?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  shareUUID?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  additional_info_work_location_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  additional_info_department_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  additional_info_excluded_mgr_position_number?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  additional_info_comments?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  additional_info?: keyof typeof SortOrder;
}
