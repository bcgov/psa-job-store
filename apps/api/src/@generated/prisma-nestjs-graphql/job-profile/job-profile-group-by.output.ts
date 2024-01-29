import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobProfileType } from '../prisma/job-profile-type.enum';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileCountAggregate } from './job-profile-count-aggregate.output';
import { JobProfileAvgAggregate } from './job-profile-avg-aggregate.output';
import { JobProfileSumAggregate } from './job-profile-sum-aggregate.output';
import { JobProfileMinAggregate } from './job-profile-min-aggregate.output';
import { JobProfileMaxAggregate } from './job-profile-max-aggregate.output';

@ObjectType()
export class JobProfileGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  role_id!: number;

  @Field(() => Int, { nullable: true })
  role_type_id?: number;

  @Field(() => Int, { nullable: true })
  scope_id?: number;

  @Field(() => JobProfileState, { nullable: false })
  state!: keyof typeof JobProfileState;

  @Field(() => JobProfileType, { nullable: false })
  type!: keyof typeof JobProfileType;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => String, { nullable: true })
  owner_id?: string;

  @Field(() => String, { nullable: true })
  program_overview?: string;

  @Field(() => Boolean, { nullable: true })
  review_required?: boolean;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: false })
  number!: number;

  @Field(() => String, { nullable: false })
  overview!: string;

  @Field(() => GraphQLJSON, { nullable: false })
  accountabilities!: any;

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

  @Field(() => JobProfileCountAggregate, { nullable: true })
  _count?: JobProfileCountAggregate;

  @Field(() => JobProfileAvgAggregate, { nullable: true })
  _avg?: JobProfileAvgAggregate;

  @Field(() => JobProfileSumAggregate, { nullable: true })
  _sum?: JobProfileSumAggregate;

  @Field(() => JobProfileMinAggregate, { nullable: true })
  _min?: JobProfileMinAggregate;

  @Field(() => JobProfileMaxAggregate, { nullable: true })
  _max?: JobProfileMaxAggregate;
}
