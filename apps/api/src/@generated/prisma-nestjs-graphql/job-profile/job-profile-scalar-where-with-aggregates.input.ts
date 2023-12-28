import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { EnumJobProfileStateWithAggregatesFilter } from '../prisma/enum-job-profile-state-with-aggregates-filter.input';
import { EnumJobProfileTypeWithAggregatesFilter } from '../prisma/enum-job-profile-type-with-aggregates-filter.input';
import { JsonWithAggregatesFilter } from '../prisma/json-with-aggregates-filter.input';
import { StringListFilter } from '../prisma/string-list-filter.input';

@InputType()
export class JobProfileScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  career_group_id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  job_family_id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  organization_id?: StringWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  role_id?: IntWithAggregatesFilter;

  @Field(() => EnumJobProfileStateWithAggregatesFilter, { nullable: true })
  state?: EnumJobProfileStateWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  stream_id?: IntWithAggregatesFilter;

  @Field(() => EnumJobProfileTypeWithAggregatesFilter, { nullable: true })
  type?: EnumJobProfileTypeWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  title?: StringWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  number?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  overview?: StringWithAggregatesFilter;

  @Field(() => JsonWithAggregatesFilter, { nullable: true })
  accountabilities?: JsonWithAggregatesFilter;

  @Field(() => StringListFilter, { nullable: true })
  requirements?: StringListFilter;
}
