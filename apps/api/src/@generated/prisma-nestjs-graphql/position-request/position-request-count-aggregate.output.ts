import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PositionRequestCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  crm_id!: number;

  @Field(() => Int, { nullable: false })
  crm_assigned_to_account_id!: number;

  @Field(() => Int, { nullable: false })
  step!: number;

  @Field(() => Int, { nullable: false })
  reports_to_position_id!: number;

  @Field(() => Int, { nullable: false })
  department_id!: number;

  @Field(() => Int, { nullable: false })
  parent_job_profile_id!: number;

  @Field(() => Int, { nullable: false })
  crm_json!: number;

  @Field(() => Int, { nullable: false })
  profile_json!: number;

  @Field(() => Int, { nullable: false })
  orgchart_json!: number;

  @Field(() => Int, { nullable: false })
  user_id!: number;

  @Field(() => Int, { nullable: false })
  title!: number;

  @Field(() => Int, { nullable: false })
  position_number!: number;

  @Field(() => Int, { nullable: false })
  classification_id!: number;

  @Field(() => Int, { nullable: false })
  classification_code!: number;

  @Field(() => Int, { nullable: false })
  user_name!: number;

  @Field(() => Int, { nullable: false })
  email!: number;

  @Field(() => Int, { nullable: false })
  submission_id!: number;

  @Field(() => Int, { nullable: false })
  submitted_at!: number;

  @Field(() => Int, { nullable: false })
  approved_at!: number;

  @Field(() => Int, { nullable: false })
  status!: number;

  @Field(() => Int, { nullable: false })
  updated_at!: number;

  @Field(() => Int, { nullable: false })
  shareUUID!: number;

  @Field(() => Int, { nullable: false })
  additional_info_work_location_id!: number;

  @Field(() => Int, { nullable: false })
  additional_info_department_id!: number;

  @Field(() => Int, { nullable: false })
  additional_info_excluded_mgr_position_number!: number;

  @Field(() => Int, { nullable: false })
  additional_info_comments!: number;

  @Field(() => Int, { nullable: false })
  additional_info!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
