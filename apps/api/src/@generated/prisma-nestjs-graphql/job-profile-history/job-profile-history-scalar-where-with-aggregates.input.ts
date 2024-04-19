import { Field, InputType } from '@nestjs/graphql';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { JsonWithAggregatesFilter } from '../prisma/json-with-aggregates-filter.input';

@InputType()
export class JobProfileHistoryScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileHistoryScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileHistoryScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileHistoryScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileHistoryScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileHistoryScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileHistoryScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  job_profile_id?: IntWithAggregatesFilter;

  @Field(() => JsonWithAggregatesFilter, { nullable: true })
  json?: JsonWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  created_at?: DateTimeWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  created_by?: IntWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updated_at?: DateTimeWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  updated_by?: IntWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  deleted_at?: DateTimeWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  deleted_by?: IntWithAggregatesFilter;
}
