import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';

@InputType()
export class JobProfileClassificationScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileClassificationScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileClassificationScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileClassificationScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileClassificationScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileClassificationScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileClassificationScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  classification_id?: StringWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  job_profile_id?: IntWithAggregatesFilter;
}
