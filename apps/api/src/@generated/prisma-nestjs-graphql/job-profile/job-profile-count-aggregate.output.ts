import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  all_organizations!: number;

  @Field(() => Int, { nullable: false })
  all_reports_to!: number;

  @Field(() => Int, { nullable: false })
  role_id!: number;

  @Field(() => Int, { nullable: false })
  role_type_id!: number;

  @Field(() => Int, { nullable: false })
  scope_id!: number;

  @Field(() => Int, { nullable: false })
  state!: number;

  @Field(() => Int, { nullable: false })
  type!: number;

  @Field(() => Int, { nullable: false })
  updated_at!: number;

  @Field(() => Int, { nullable: false })
  owner_id!: number;

  @Field(() => Int, { nullable: false })
  program_overview!: number;

  @Field(() => Int, { nullable: false })
  review_required!: number;

  @Field(() => Int, { nullable: false })
  title!: number;

  @Field(() => Int, { nullable: false })
  number!: number;

  @Field(() => Int, { nullable: false })
  overview!: number;

  @Field(() => Int, { nullable: false })
  accountabilities!: number;

  @Field(() => Int, { nullable: false })
  education!: number;

  @Field(() => Int, { nullable: false })
  job_experience!: number;

  @Field(() => Int, { nullable: false })
  professional_registration_requirements!: number;

  @Field(() => Int, { nullable: false })
  preferences!: number;

  @Field(() => Int, { nullable: false })
  knowledge_skills_abilities!: number;

  @Field(() => Int, { nullable: false })
  willingness_statements!: number;

  @Field(() => Int, { nullable: false })
  optional_requirements!: number;

  @Field(() => Int, { nullable: false })
  security_screenings!: number;

  @Field(() => Int, { nullable: false })
  total_comp_create_form_misc!: number;

  @Field(() => Int, { nullable: false })
  is_archived!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
