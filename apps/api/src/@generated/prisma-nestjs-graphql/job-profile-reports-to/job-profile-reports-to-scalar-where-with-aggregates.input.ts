import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';

@InputType()
export class JobProfileReportsToScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileReportsToScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileReportsToScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileReportsToScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileReportsToScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileReportsToScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileReportsToScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  classification_id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  job_profile_id?: IntWithAggregatesFilter;
}
