import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileOrganizationUpdateWithoutOrganizationInput } from './job-profile-organization-update-without-organization.input';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';

@InputType()
export class JobProfileOrganizationUpdateWithWhereUniqueWithoutOrganizationInput {
  @Field(() => JobProfileOrganizationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>;

  @Field(() => JobProfileOrganizationUpdateWithoutOrganizationInput, { nullable: false })
  @Type(() => JobProfileOrganizationUpdateWithoutOrganizationInput)
  data!: JobProfileOrganizationUpdateWithoutOrganizationInput;
}
