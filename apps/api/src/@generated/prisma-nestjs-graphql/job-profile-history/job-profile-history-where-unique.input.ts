import { Field, InputType, Int } from '@nestjs/graphql';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { JobProfileHistoryWhereInput } from './job-profile-history-where.input';

@InputType()
export class JobProfileHistoryWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobProfileHistoryWhereInput], { nullable: true })
  AND?: Array<JobProfileHistoryWhereInput>;

  @Field(() => [JobProfileHistoryWhereInput], { nullable: true })
  OR?: Array<JobProfileHistoryWhereInput>;

  @Field(() => [JobProfileHistoryWhereInput], { nullable: true })
  NOT?: Array<JobProfileHistoryWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;

  @Field(() => JsonFilter, { nullable: true })
  json?: JsonFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  created_at?: DateTimeFilter;

  @Field(() => IntFilter, { nullable: true })
  created_by?: IntFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updated_at?: DateTimeFilter;

  @Field(() => IntFilter, { nullable: true })
  updated_by?: IntFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  deleted_at?: DateTimeFilter;

  @Field(() => IntFilter, { nullable: true })
  deleted_by?: IntFilter;
}
