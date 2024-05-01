import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { EnumPositionRequestStatusFilter } from '../prisma/enum-position-request-status-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class PositionRequestScalarWhereInput {
  @Field(() => [PositionRequestScalarWhereInput], { nullable: true })
  AND?: Array<PositionRequestScalarWhereInput>;

  @Field(() => [PositionRequestScalarWhereInput], { nullable: true })
  OR?: Array<PositionRequestScalarWhereInput>;

  @Field(() => [PositionRequestScalarWhereInput], { nullable: true })
  NOT?: Array<PositionRequestScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  crm_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  crm_assigned_to_account_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  step?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  reports_to_position_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  department_id?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  parent_job_profile_id?: IntFilter;

  @Field(() => JsonFilter, { nullable: true })
  crm_json?: JsonFilter;

  @Field(() => JsonFilter, { nullable: true })
  profile_json?: JsonFilter;

  @Field(() => JsonFilter, { nullable: true })
  orgchart_json?: JsonFilter;

  @Field(() => UuidFilter, { nullable: true })
  user_id?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  position_number?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  classification_code?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  user_name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  email?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  submission_id?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  submitted_at?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  approved_at?: DateTimeFilter;

  @Field(() => EnumPositionRequestStatusFilter, { nullable: true })
  status?: EnumPositionRequestStatusFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updated_at?: DateTimeFilter;

  @Field(() => UuidFilter, { nullable: true })
  shareUUID?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  additional_info_work_location_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  additional_info_department_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  additional_info_excluded_mgr_position_number?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  additional_info_comments?: StringFilter;

  @Field(() => JsonFilter, { nullable: true })
  additional_info?: JsonFilter;
}
