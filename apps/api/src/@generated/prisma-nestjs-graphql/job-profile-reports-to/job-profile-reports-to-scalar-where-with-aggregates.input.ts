import { Field, InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobProfileReportsToScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileReportsToScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileReportsToScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileReportsToScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileReportsToScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileReportsToScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileReportsToScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  classification_id?: StringWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  job_profile_id?: IntWithAggregatesFilter;
}
