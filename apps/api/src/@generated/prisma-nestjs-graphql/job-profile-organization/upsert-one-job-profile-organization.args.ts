import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileOrganizationCreateInput } from './job-profile-organization-create.input';
import { JobProfileOrganizationUpdateInput } from './job-profile-organization-update.input';

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
