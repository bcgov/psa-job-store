import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  all_organizations?: true;

  @Field(() => Boolean, { nullable: true })
  all_reports_to?: true;

  @Field(() => Boolean, { nullable: true })
  role_id?: true;

  @Field(() => Boolean, { nullable: true })
  role_type_id?: true;

  @Field(() => Boolean, { nullable: true })
  scope_id?: true;

  @Field(() => Boolean, { nullable: true })
  state?: true;

  @Field(() => Boolean, { nullable: true })
  type?: true;

  @Field(() => Boolean, { nullable: true })
  updated_at?: true;

  @Field(() => Boolean, { nullable: true })
  owner_id?: true;

  @Field(() => Boolean, { nullable: true })
  program_overview?: true;

  @Field(() => Boolean, { nullable: true })
  review_required?: true;

  @Field(() => Boolean, { nullable: true })
  title?: true;

  @Field(() => Boolean, { nullable: true })
  number?: true;

  @Field(() => Boolean, { nullable: true })
  overview?: true;

  @Field(() => Boolean, { nullable: true })
  accountabilities?: true;

  @Field(() => Boolean, { nullable: true })
  education?: true;

  @Field(() => Boolean, { nullable: true })
  job_experience?: true;

  @Field(() => Boolean, { nullable: true })
  professional_registration_requirements?: true;

  @Field(() => Boolean, { nullable: true })
  preferences?: true;

  @Field(() => Boolean, { nullable: true })
  knowledge_skills_abilities?: true;

  @Field(() => Boolean, { nullable: true })
  willingness_statements?: true;

  @Field(() => Boolean, { nullable: true })
  optional_requirements?: true;

  @Field(() => Boolean, { nullable: true })
  security_screenings?: true;

  @Field(() => Boolean, { nullable: true })
  total_comp_create_form_misc?: true;

  @Field(() => Boolean, { nullable: true })
  is_archived?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
