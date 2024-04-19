import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { ScheduledTaskMetadataWhereInput } from './scheduled-task-metadata-where.input';

@InputType()
export class ScheduledTaskMetadataWhereUniqueInput {
  @Field(() => String, { nullable: true })
  task?: string;

  @Field(() => [ScheduledTaskMetadataWhereInput], { nullable: true })
  AND?: Array<ScheduledTaskMetadataWhereInput>;

  @Field(() => [ScheduledTaskMetadataWhereInput], { nullable: true })
  OR?: Array<ScheduledTaskMetadataWhereInput>;

  @Field(() => [ScheduledTaskMetadataWhereInput], { nullable: true })
  NOT?: Array<ScheduledTaskMetadataWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  frequency?: IntFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  last_run_at?: DateTimeFilter;
}
