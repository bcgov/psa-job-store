import { Field, InputType } from '@nestjs/graphql';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class ScheduledTaskMetadataScalarWhereWithAggregatesInput {
  @Field(() => [ScheduledTaskMetadataScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ScheduledTaskMetadataScalarWhereWithAggregatesInput>;

  @Field(() => [ScheduledTaskMetadataScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ScheduledTaskMetadataScalarWhereWithAggregatesInput>;

  @Field(() => [ScheduledTaskMetadataScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ScheduledTaskMetadataScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  task?: StringWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  frequency?: IntWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  last_run_at?: DateTimeWithAggregatesFilter;
}
