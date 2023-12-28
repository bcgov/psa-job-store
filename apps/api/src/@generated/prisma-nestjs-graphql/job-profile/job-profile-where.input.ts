import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { EnumJobProfileStateFilter } from '../prisma/enum-job-profile-state-filter.input';
import { EnumJobProfileTypeFilter } from '../prisma/enum-job-profile-type-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { StringListFilter } from '../prisma/string-list-filter.input';
import { JobProfileBehaviouralCompetencyListRelationFilter } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-list-relation-filter.input';
import { JobProfileClassificationListRelationFilter } from '../job-profile-classification/job-profile-classification-list-relation-filter.input';
import { JobProfileCareerGroupRelationFilter } from '../job-profile-career-group/job-profile-career-group-relation-filter.input';
import { JobProfileContextRelationFilter } from '../job-profile-context/job-profile-context-relation-filter.input';
import { JobProfileJobFamilyRelationFilter } from '../job-profile-job-family/job-profile-job-family-relation-filter.input';
import { OrganizationRelationFilter } from '../organization/organization-relation-filter.input';
import { JobProfileRoleRelationFilter } from '../job-profile-role/job-profile-role-relation-filter.input';
import { JobProfileStreamRelationFilter } from '../job-profile-stream/job-profile-stream-relation-filter.input';
import { JobProfileReportsToListRelationFilter } from '../job-profile-reports-to/job-profile-reports-to-list-relation-filter.input';
import { PositionRequestListRelationFilter } from '../position-request/position-request-list-relation-filter.input';

@InputType()
export class JobProfileWhereInput {
  @Field(() => [JobProfileWhereInput], { nullable: true })
  AND?: Array<JobProfileWhereInput>;

  @Field(() => [JobProfileWhereInput], { nullable: true })
  OR?: Array<JobProfileWhereInput>;

  @Field(() => [JobProfileWhereInput], { nullable: true })
  NOT?: Array<JobProfileWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  career_group_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  job_family_id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  organization_id?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  role_id?: IntFilter;

  @Field(() => EnumJobProfileStateFilter, { nullable: true })
  state?: EnumJobProfileStateFilter;

  @Field(() => IntFilter, { nullable: true })
  stream_id?: IntFilter;

  @Field(() => EnumJobProfileTypeFilter, { nullable: true })
  type?: EnumJobProfileTypeFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  number?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  overview?: StringFilter;

  @Field(() => JsonFilter, { nullable: true })
  accountabilities?: JsonFilter;

  @Field(() => StringListFilter, { nullable: true })
  requirements?: StringListFilter;

  @Field(() => JobProfileBehaviouralCompetencyListRelationFilter, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyListRelationFilter;

  @Field(() => JobProfileClassificationListRelationFilter, { nullable: true })
  classifications?: JobProfileClassificationListRelationFilter;

  @Field(() => JobProfileCareerGroupRelationFilter, { nullable: true })
  career_group?: JobProfileCareerGroupRelationFilter;

  @Field(() => JobProfileContextRelationFilter, { nullable: true })
  context?: JobProfileContextRelationFilter;

  @Field(() => JobProfileJobFamilyRelationFilter, { nullable: true })
  job_family?: JobProfileJobFamilyRelationFilter;

  @Field(() => OrganizationRelationFilter, { nullable: true })
  organization?: OrganizationRelationFilter;

  @Field(() => JobProfileRoleRelationFilter, { nullable: true })
  role?: JobProfileRoleRelationFilter;

  @Field(() => JobProfileStreamRelationFilter, { nullable: true })
  stream?: JobProfileStreamRelationFilter;

  @Field(() => JobProfileReportsToListRelationFilter, { nullable: true })
  reports_to?: JobProfileReportsToListRelationFilter;

  @Field(() => PositionRequestListRelationFilter, { nullable: true })
  position_request?: PositionRequestListRelationFilter;
}
