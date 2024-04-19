import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PositionRequestStatus } from '../prisma/position-request-status.enum';

@ObjectType()
export class PositionRequestMinAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  crm_id?: number;

  @Field(() => Int, { nullable: true })
  crm_assigned_to_account_id?: number;

  @Field(() => Int, { nullable: true })
  step?: number;

  @Field(() => String, { nullable: true })
  reports_to_position_id?: string;

  @Field(() => String, { nullable: true })
  department_id?: string;

  @Field(() => Int, { nullable: true })
  parent_job_profile_id?: number;

  @Field(() => String, { nullable: true })
  user_id?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  position_number?: number;

  @Field(() => String, { nullable: true })
  classification_id?: string;

  @Field(() => String, { nullable: true })
  classification_code?: string;

  @Field(() => String, { nullable: true })
  user_name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  submission_id?: string;

  @Field(() => Date, { nullable: true })
  submitted_at?: Date | string;

  @Field(() => Date, { nullable: true })
  approved_at?: Date | string;

  @Field(() => PositionRequestStatus, { nullable: true })
  status?: keyof typeof PositionRequestStatus;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => String, { nullable: true })
  shareUUID?: string;

  @Field(() => String, { nullable: true })
  additional_info_work_location_id?: string;

  @Field(() => String, { nullable: true })
  additional_info_department_id?: string;

  @Field(() => String, { nullable: true })
  additional_info_excluded_mgr_position_number?: string;

  @Field(() => String, { nullable: true })
  additional_info_comments?: string;
}
