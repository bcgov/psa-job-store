import { Field, InputType } from '@nestjs/graphql';
import { DepartmentListRelationFilter } from '../department/department-list-relation-filter.input';
import { JobProfileOrganizationListRelationFilter } from '../job-profile-organization/job-profile-organization-list-relation-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { OrganizationWhereInput } from './organization-where.input';

@InputType()
export class OrganizationWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  peoplesoft_id?: string;

  @Field(() => [OrganizationWhereInput], { nullable: true })
  AND?: Array<OrganizationWhereInput>;

  @Field(() => [OrganizationWhereInput], { nullable: true })
  OR?: Array<OrganizationWhereInput>;

  @Field(() => [OrganizationWhereInput], { nullable: true })
  NOT?: Array<OrganizationWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  code?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  effective_status?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  effective_date?: DateTimeFilter;

  @Field(() => DepartmentListRelationFilter, { nullable: true })
  departments?: DepartmentListRelationFilter;

  @Field(() => JobProfileOrganizationListRelationFilter, { nullable: true })
  JobProfileOrganization?: JobProfileOrganizationListRelationFilter;
}
