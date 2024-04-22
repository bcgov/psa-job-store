import { Field, InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobProfileContextScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileContextScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileContextScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileContextScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileContextScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileContextScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileContextScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  job_profile_id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  description?: StringWithAggregatesFilter;
}
