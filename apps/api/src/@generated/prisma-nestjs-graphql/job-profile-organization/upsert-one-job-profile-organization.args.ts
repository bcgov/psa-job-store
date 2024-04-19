import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileOrganizationCreateInput } from './job-profile-organization-create.input';
import { JobProfileOrganizationUpdateInput } from './job-profile-organization-update.input';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';

@ArgsType()
export class UpsertOneJobProfileOrganizationArgs {
  @Field(() => JobProfileOrganizationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>;

  @Field(() => JobProfileOrganizationCreateInput, { nullable: false })
  @Type(() => JobProfileOrganizationCreateInput)
  create!: JobProfileOrganizationCreateInput;

  @Field(() => JobProfileOrganizationUpdateInput, { nullable: false })
  @Type(() => JobProfileOrganizationUpdateInput)
  update!: JobProfileOrganizationUpdateInput;
}
