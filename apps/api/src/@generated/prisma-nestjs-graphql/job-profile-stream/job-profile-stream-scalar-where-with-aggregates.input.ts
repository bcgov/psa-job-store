import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobProfileStreamScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileStreamScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileStreamScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileStreamScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileStreamScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileStreamScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileStreamScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  job_family_id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
