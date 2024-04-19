import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class ScheduledTaskMetadataWhereInput {
  @Field(() => [ScheduledTaskMetadataWhereInput], { nullable: true })
  AND?: Array<ScheduledTaskMetadataWhereInput>;

  @Field(() => [ScheduledTaskMetadataWhereInput], { nullable: true })
  OR?: Array<ScheduledTaskMetadataWhereInput>;

  @Field(() => [ScheduledTaskMetadataWhereInput], { nullable: true })
  NOT?: Array<ScheduledTaskMetadataWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  task?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  frequency?: IntFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  last_run_at?: DateTimeFilter;
}
