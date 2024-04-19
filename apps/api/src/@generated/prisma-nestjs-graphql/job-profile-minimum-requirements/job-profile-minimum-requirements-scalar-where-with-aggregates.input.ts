import { Field, InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobProfileMinimumRequirementsScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileMinimumRequirementsScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileMinimumRequirementsScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileMinimumRequirementsScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileMinimumRequirementsScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileMinimumRequirementsScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileMinimumRequirementsScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  requirement?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  grade?: StringWithAggregatesFilter;
}
