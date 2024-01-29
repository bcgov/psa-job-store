import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileOrganizationUpdateWithoutOrganizationInput } from './job-profile-organization-update-without-organization.input';
import { JobProfileOrganizationCreateWithoutOrganizationInput } from './job-profile-organization-create-without-organization.input';

@InputType()
export class JobProfileOrganizationUpsertWithWhereUniqueWithoutOrganizationInput {
  @Field(() => JobProfileOrganizationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>;

  @Field(() => JobProfileOrganizationUpdateWithoutOrganizationInput, { nullable: false })
  @Type(() => JobProfileOrganizationUpdateWithoutOrganizationInput)
  update!: JobProfileOrganizationUpdateWithoutOrganizationInput;

  @Field(() => JobProfileOrganizationCreateWithoutOrganizationInput, { nullable: false })
  @Type(() => JobProfileOrganizationCreateWithoutOrganizationInput)
  create!: JobProfileOrganizationCreateWithoutOrganizationInput;
}
