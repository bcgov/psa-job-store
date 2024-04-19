import { Field, InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobProfileScopeScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileScopeScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileScopeScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileScopeScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileScopeScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileScopeScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileScopeScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  description?: StringWithAggregatesFilter;
}
