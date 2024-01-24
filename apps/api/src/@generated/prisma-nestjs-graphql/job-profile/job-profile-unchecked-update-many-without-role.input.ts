import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobProfileType } from '../prisma/job-profile-type.enum';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class JobProfileUncheckedUpdateManyWithoutRoleInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  career_group_id?: number;

  @Field(() => Int, { nullable: true })
  role_type_id?: number;

  @Field(() => Int, { nullable: true })
  scope_id?: number;

  @Field(() => JobProfileState, { nullable: true })
  state?: keyof typeof JobProfileState;

  @Field(() => JobProfileType, { nullable: true })
  type?: keyof typeof JobProfileType;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => String, { nullable: true })
  owner_id?: string;

  @Field(() => String, { nullable: true })
  program_overview?: string;

  @Field(() => Boolean, { nullable: true })
  review_required?: boolean;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  number?: number;

  @Field(() => String, { nullable: true })
  overview?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  accountabilities?: any;

  @Field(() => [String], { nullable: true })
  requirements?: Array<string>;

  @Field(() => [String], { nullable: true })
  professional_registration_requirements?: Array<string>;

  @Field(() => [String], { nullable: true })
  preferences?: Array<string>;

  @Field(() => [String], { nullable: true })
  knowledge_skills_abilities?: Array<string>;

  @Field(() => [String], { nullable: true })
  willingness_statements?: Array<string>;

  @Field(() => [String], { nullable: true })
  security_screenings?: Array<string>;

  @Field(() => GraphQLJSON, { nullable: true })
  total_comp_create_form_misc?: any;
}
