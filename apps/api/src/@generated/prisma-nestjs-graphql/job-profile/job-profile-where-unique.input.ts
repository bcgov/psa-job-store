import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { EnumJobProfileStateFilter } from '../prisma/enum-job-profile-state-filter.input';
import { EnumJobProfileTypeFilter } from '../prisma/enum-job-profile-type-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { StringListFilter } from '../prisma/string-list-filter.input';
import { JobProfileBehaviouralCompetencyListRelationFilter } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-list-relation-filter.input';
import { JobProfileClassificationListRelationFilter } from '../job-profile-classification/job-profile-classification-list-relation-filter.input';
import { JobProfileOrganizationListRelationFilter } from '../job-profile-organization/job-profile-organization-list-relation-filter.input';
import { JobProfileContextRelationFilter } from '../job-profile-context/job-profile-context-relation-filter.input';
import { JobProfileRoleRelationFilter } from '../job-profile-role/job-profile-role-relation-filter.input';
import { JobProfileRoleTypeRelationFilter } from '../job-profile-role-type/job-profile-role-type-relation-filter.input';
import { JobProfileScopeRelationFilter } from '../job-profile-scope/job-profile-scope-relation-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { JobProfileJobFamilyLinkListRelationFilter } from '../job-profile-job-family-link/job-profile-job-family-link-list-relation-filter.input';
import { JobProfileStreamLinkListRelationFilter } from '../job-profile-stream-link/job-profile-stream-link-list-relation-filter.input';
import { JobProfileReportsToListRelationFilter } from '../job-profile-reports-to/job-profile-reports-to-list-relation-filter.input';
import { PositionRequestListRelationFilter } from '../position-request/position-request-list-relation-filter.input';

@InputType()
export class JobProfileWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  number?: number;

  @Field(() => [JobProfileWhereInput], { nullable: true })
  AND?: Array<JobProfileWhereInput>;

  @Field(() => [JobProfileWhereInput], { nullable: true })
  OR?: Array<JobProfileWhereInput>;

  @Field(() => [JobProfileWhereInput], { nullable: true })
  NOT?: Array<JobProfileWhereInput>;

  @Field(() => BoolFilter, { nullable: true })
  all_organizations?: BoolFilter;

  @Field(() => BoolFilter, { nullable: true })
  all_reports_to?: BoolFilter;

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

  @Field(() => StringFilter, { nullable: true })
  overview?: StringFilter;

  @Field(() => JsonFilter, { nullable: true })
  accountabilities?: JsonFilter;

  @Field(() => JsonFilter, { nullable: true })
  education?: JsonFilter;

  @Field(() => JsonFilter, { nullable: true })
  job_experience?: JsonFilter;

  @Field(() => StringListFilter, { nullable: true })
  professional_registration_requirements?: StringListFilter;

  @Field(() => StringListFilter, { nullable: true })
  preferences?: StringListFilter;

  @Field(() => StringListFilter, { nullable: true })
  knowledge_skills_abilities?: StringListFilter;

  @Field(() => StringListFilter, { nullable: true })
  willingness_statements?: StringListFilter;

  @Field(() => StringListFilter, { nullable: true })
  optional_requirements?: StringListFilter;

  @Field(() => JsonFilter, { nullable: true })
  security_screenings?: JsonFilter;

  @Field(() => JsonFilter, { nullable: true })
  total_comp_create_form_misc?: JsonFilter;

  @Field(() => JobProfileBehaviouralCompetencyListRelationFilter, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyListRelationFilter;

  @Field(() => JobProfileClassificationListRelationFilter, { nullable: true })
  classifications?: JobProfileClassificationListRelationFilter;

  @Field(() => JobProfileOrganizationListRelationFilter, { nullable: true })
  organizations?: JobProfileOrganizationListRelationFilter;

  @Field(() => JobProfileContextRelationFilter, { nullable: true })
  context?: JobProfileContextRelationFilter;

  @Field(() => JobProfileRoleRelationFilter, { nullable: true })
  role?: JobProfileRoleRelationFilter;

  @Field(() => JobProfileRoleTypeRelationFilter, { nullable: true })
  role_type?: JobProfileRoleTypeRelationFilter;

  @Field(() => JobProfileScopeRelationFilter, { nullable: true })
  scope?: JobProfileScopeRelationFilter;

  @Field(() => UserRelationFilter, { nullable: true })
  owner?: UserRelationFilter;

  @Field(() => JobProfileJobFamilyLinkListRelationFilter, { nullable: true })
  jobFamilies?: JobProfileJobFamilyLinkListRelationFilter;

  @Field(() => JobProfileStreamLinkListRelationFilter, { nullable: true })
  streams?: JobProfileStreamLinkListRelationFilter;

  @Field(() => JobProfileReportsToListRelationFilter, { nullable: true })
  reports_to?: JobProfileReportsToListRelationFilter;

  @Field(() => PositionRequestListRelationFilter, { nullable: true })
  position_request?: PositionRequestListRelationFilter;
}
