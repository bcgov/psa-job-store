import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobProfileType } from '../prisma/job-profile-type.enum';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutJob_profileInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-unchecked-create-nested-many-without-job-profile.input';
import { JobProfileClassificationUncheckedCreateNestedManyWithoutJob_profileInput } from '../job-profile-classification/job-profile-classification-unchecked-create-nested-many-without-job-profile.input';
import { JobProfileContextUncheckedCreateNestedOneWithoutJob_profileInput } from '../job-profile-context/job-profile-context-unchecked-create-nested-one-without-job-profile.input';
import { JobProfileJobFamilyLinkUncheckedCreateNestedManyWithoutJobProfileInput } from '../job-profile-job-family-link/job-profile-job-family-link-unchecked-create-nested-many-without-job-profile.input';
import { JobProfileStreamLinkUncheckedCreateNestedManyWithoutJobProfileInput } from '../job-profile-stream-link/job-profile-stream-link-unchecked-create-nested-many-without-job-profile.input';
import { JobProfileReportsToUncheckedCreateNestedManyWithoutJob_profileInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-create-nested-many-without-job-profile.input';
import { PositionRequestUncheckedCreateNestedManyWithoutParent_job_profileInput } from '../position-request/position-request-unchecked-create-nested-many-without-parent-job-profile.input';

@InputType()
export class JobProfileUncheckedCreateWithoutOrganizationsInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Boolean, { nullable: true })
  all_organizations?: boolean;

  @Field(() => Boolean, { nullable: true })
  all_reports_to?: boolean;

  @Field(() => Int, { nullable: true })
  role_id?: number;

  @Field(() => Int, { nullable: true })
  role_type_id?: number;

  @Field(() => Int, { nullable: true })
  scope_id?: number;

  @Field(() => JobProfileState, { nullable: true })
  state?: keyof typeof JobProfileState;

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

  @Field(() => GraphQLJSON, { nullable: true })
  accountabilities?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  education?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  job_experience?: any;

  @Field(() => [String], { nullable: true })
  professional_registration_requirements?: Array<string>;

  @Field(() => [String], { nullable: true })
  preferences?: Array<string>;

  @Field(() => [String], { nullable: true })
  knowledge_skills_abilities?: Array<string>;

  @Field(() => [String], { nullable: true })
  willingness_statements?: Array<string>;

  @Field(() => GraphQLJSON, { nullable: true })
  security_screenings?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  total_comp_create_form_misc?: any;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutJob_profileInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobProfileClassificationUncheckedCreateNestedManyWithoutJob_profileInput, { nullable: true })
  classifications?: JobProfileClassificationUncheckedCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobProfileContextUncheckedCreateNestedOneWithoutJob_profileInput, { nullable: true })
  context?: JobProfileContextUncheckedCreateNestedOneWithoutJob_profileInput;

  @Field(() => JobProfileJobFamilyLinkUncheckedCreateNestedManyWithoutJobProfileInput, { nullable: true })
  jobFamilies?: JobProfileJobFamilyLinkUncheckedCreateNestedManyWithoutJobProfileInput;

  @Field(() => JobProfileStreamLinkUncheckedCreateNestedManyWithoutJobProfileInput, { nullable: true })
  streams?: JobProfileStreamLinkUncheckedCreateNestedManyWithoutJobProfileInput;

  @Field(() => JobProfileReportsToUncheckedCreateNestedManyWithoutJob_profileInput, { nullable: true })
  reports_to?: JobProfileReportsToUncheckedCreateNestedManyWithoutJob_profileInput;

  @Field(() => PositionRequestUncheckedCreateNestedManyWithoutParent_job_profileInput, { nullable: true })
  position_request?: PositionRequestUncheckedCreateNestedManyWithoutParent_job_profileInput;
}
