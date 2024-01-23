import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { EnumPositionRequestStatusFilter } from '../prisma/enum-position-request-status-filter.input';

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

  @Field(() => UuidFilter, { nullable: true })
  classificationAssignedTo?: UuidFilter;

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
}
