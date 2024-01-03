import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { JsonWithAggregatesFilter } from '../prisma/json-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';
import { EnumPositionRequestStatusWithAggregatesFilter } from '../prisma/enum-position-request-status-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class PositionRequestScalarWhereWithAggregatesInput {
  @Field(() => [PositionRequestScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<PositionRequestScalarWhereWithAggregatesInput>;

  @Field(() => [PositionRequestScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<PositionRequestScalarWhereWithAggregatesInput>;

  @Field(() => [PositionRequestScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<PositionRequestScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  step?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  reports_to_position_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  department_id?: StringWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  parent_job_profile_id?: IntWithAggregatesFilter;

  @Field(() => JsonWithAggregatesFilter, { nullable: true })
  profile_json?: JsonWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  user_id?: UuidWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  title?: StringWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  position_number?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  classification_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  classification_code?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  submission_id?: StringWithAggregatesFilter;

  @Field(() => EnumPositionRequestStatusWithAggregatesFilter, { nullable: true })
  status?: EnumPositionRequestStatusWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updated_at?: DateTimeWithAggregatesFilter;
}
