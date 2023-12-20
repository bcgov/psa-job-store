import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { EnumJobProfileStateFilter } from '../prisma/enum-job-profile-state-filter.input';
import { EnumJobStreamFilter } from '../prisma/enum-job-stream-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { StringListFilter } from '../prisma/string-list-filter.input';
import { JobProfileBehaviouralCompetencyListRelationFilter } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-list-relation-filter.input';
import { JobProfileReportsToListRelationFilter } from '../job-profile-reports-to/job-profile-reports-to-list-relation-filter.input';
import { CareerGroupRelationFilter } from '../career-group/career-group-relation-filter.input';
import { JobProfileListRelationFilter } from './job-profile-list-relation-filter.input';
import { ClassificationRelationFilter } from '../classification/classification-relation-filter.input';
import { JobFamilyRelationFilter } from '../job-family/job-family-relation-filter.input';
import { OrganizationRelationFilter } from '../organization/organization-relation-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { JobProfileRelationFilter } from './job-profile-relation-filter.input';
import { JobRoleRelationFilter } from '../job-role/job-role-relation-filter.input';

@InputType()
export class JobProfileWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobProfileWhereInput], { nullable: true })
  AND?: Array<JobProfileWhereInput>;

  @Field(() => [JobProfileWhereInput], { nullable: true })
  OR?: Array<JobProfileWhereInput>;

  @Field(() => [JobProfileWhereInput], { nullable: true })
  NOT?: Array<JobProfileWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  career_group_id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  family_id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  organization_id?: StringFilter;

  @Field(() => UuidFilter, { nullable: true })
  owner_id?: UuidFilter;

  @Field(() => IntFilter, { nullable: true })
  parent_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  role_id?: IntFilter;

  @Field(() => EnumJobProfileStateFilter, { nullable: true })
  state?: EnumJobProfileStateFilter;

  @Field(() => EnumJobStreamFilter, { nullable: true })
  stream?: EnumJobStreamFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  number?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  context?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  overview?: StringFilter;

  @Field(() => JsonFilter, { nullable: true })
  accountabilities?: JsonFilter;

  @Field(() => StringListFilter, { nullable: true })
  requirements?: StringListFilter;

  @Field(() => JobProfileBehaviouralCompetencyListRelationFilter, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyListRelationFilter;

  @Field(() => JobProfileReportsToListRelationFilter, { nullable: true })
  reports_to?: JobProfileReportsToListRelationFilter;

  @Field(() => CareerGroupRelationFilter, { nullable: true })
  career_group?: CareerGroupRelationFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  children?: JobProfileListRelationFilter;

  @Field(() => ClassificationRelationFilter, { nullable: true })
  classification?: ClassificationRelationFilter;

  @Field(() => JobFamilyRelationFilter, { nullable: true })
  family?: JobFamilyRelationFilter;

  @Field(() => OrganizationRelationFilter, { nullable: true })
  organization?: OrganizationRelationFilter;

  @Field(() => UserRelationFilter, { nullable: true })
  owner?: UserRelationFilter;

  @Field(() => JobProfileRelationFilter, { nullable: true })
  parent?: JobProfileRelationFilter;

  @Field(() => JobRoleRelationFilter, { nullable: true })
  role?: JobRoleRelationFilter;
}
