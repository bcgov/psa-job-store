import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { EnumJobProfileStateWithAggregatesFilter } from '../prisma/enum-job-profile-state-with-aggregates-filter.input';
import { EnumJobProfileTypeWithAggregatesFilter } from '../prisma/enum-job-profile-type-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';
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
  role_id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  role_type_id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  scope_id?: IntWithAggregatesFilter;

  @Field(() => EnumJobProfileStateWithAggregatesFilter, { nullable: true })
  state?: EnumJobProfileStateWithAggregatesFilter;

  @Field(() => EnumJobProfileTypeWithAggregatesFilter, { nullable: true })
  type?: EnumJobProfileTypeWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updated_at?: DateTimeWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  owner_id?: UuidWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  program_overview?: StringWithAggregatesFilter;

  @Field(() => BoolWithAggregatesFilter, { nullable: true })
  review_required?: BoolWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  title?: StringWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  number?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  overview?: StringWithAggregatesFilter;

  @Field(() => JsonWithAggregatesFilter, { nullable: true })
  accountabilities?: JsonWithAggregatesFilter;

  @Field(() => JsonWithAggregatesFilter, { nullable: true })
  requirements?: JsonWithAggregatesFilter;

  @Field(() => StringListFilter, { nullable: true })
  professional_registration_requirements?: StringListFilter;

  @Field(() => StringListFilter, { nullable: true })
  preferences?: StringListFilter;

  @Field(() => StringListFilter, { nullable: true })
  knowledge_skills_abilities?: StringListFilter;

  @Field(() => StringListFilter, { nullable: true })
  willingness_statements?: StringListFilter;

  @Field(() => JsonWithAggregatesFilter, { nullable: true })
  security_screenings?: JsonWithAggregatesFilter;

  @Field(() => JsonWithAggregatesFilter, { nullable: true })
  total_comp_create_form_misc?: JsonWithAggregatesFilter;
}
