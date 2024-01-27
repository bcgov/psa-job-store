import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { EnumJobProfileStateFilter } from '../prisma/enum-job-profile-state-filter.input';
import { EnumJobProfileTypeFilter } from '../prisma/enum-job-profile-type-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { StringListFilter } from '../prisma/string-list-filter.input';

@InputType()
export class JobProfileScalarWhereInput {
  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  AND?: Array<JobProfileScalarWhereInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  OR?: Array<JobProfileScalarWhereInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  NOT?: Array<JobProfileScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  role_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  role_type_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  scope_id?: IntFilter;

  @Field(() => EnumJobProfileStateFilter, { nullable: true })
  state?: EnumJobProfileStateFilter;

  @Field(() => EnumJobProfileTypeFilter, { nullable: true })
  type?: EnumJobProfileTypeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updated_at?: DateTimeFilter;

  @Field(() => UuidFilter, { nullable: true })
  owner_id?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  program_overview?: StringFilter;

  @Field(() => BoolFilter, { nullable: true })
  review_required?: BoolFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  number?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  overview?: StringFilter;

  @Field(() => JsonFilter, { nullable: true })
  accountabilities?: JsonFilter;

  @Field(() => JsonFilter, { nullable: true })
  requirements?: JsonFilter;

  @Field(() => StringListFilter, { nullable: true })
  professional_registration_requirements?: StringListFilter;

  @Field(() => StringListFilter, { nullable: true })
  preferences?: StringListFilter;

  @Field(() => StringListFilter, { nullable: true })
  knowledge_skills_abilities?: StringListFilter;

  @Field(() => StringListFilter, { nullable: true })
  willingness_statements?: StringListFilter;

  @Field(() => JsonFilter, { nullable: true })
  security_screenings?: JsonFilter;

  @Field(() => JsonFilter, { nullable: true })
  total_comp_create_form_misc?: JsonFilter;
}
