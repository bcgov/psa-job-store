import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationOrganization_idJob_profile_idCompoundUniqueInput } from './job-profile-organization-organization-id-job-profile-id-compound-unique.input';
import { JobProfileOrganizationWhereInput } from './job-profile-organization-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { OrganizationRelationFilter } from '../organization/organization-relation-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';

@InputType()
export class JobProfileOrganizationWhereUniqueInput {
  @Field(() => JobProfileOrganizationOrganization_idJob_profile_idCompoundUniqueInput, { nullable: true })
  organization_id_job_profile_id?: JobProfileOrganizationOrganization_idJob_profile_idCompoundUniqueInput;

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
