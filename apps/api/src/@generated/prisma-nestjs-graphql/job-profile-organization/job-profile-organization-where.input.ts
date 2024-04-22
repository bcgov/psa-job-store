import { Field, InputType } from '@nestjs/graphql';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';
import { OrganizationRelationFilter } from '../organization/organization-relation-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class JobProfileOrganizationWhereInput {
  @Field(() => [JobProfileOrganizationWhereInput], { nullable: true })
  AND?: Array<JobProfileOrganizationWhereInput>;

  @Field(() => [JobProfileOrganizationWhereInput], { nullable: true })
  OR?: Array<JobProfileOrganizationWhereInput>;

  @Field(() => [JobProfileOrganizationWhereInput], { nullable: true })
  NOT?: Array<JobProfileOrganizationWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  organization_id?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;

  @Field(() => OrganizationRelationFilter, { nullable: true })
  organization?: OrganizationRelationFilter;

  @Field(() => JobProfileRelationFilter, { nullable: true })
  job_profile?: JobProfileRelationFilter;
}
