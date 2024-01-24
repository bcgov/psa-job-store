import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileOrganizationUpdateWithoutJob_profileInput } from './job-profile-organization-update-without-job-profile.input';

@InputType()
export class JobProfileOrganizationUpdateWithWhereUniqueWithoutJob_profileInput {
  @Field(() => JobProfileOrganizationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>;

  @Field(() => JobProfileOrganizationUpdateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileOrganizationUpdateWithoutJob_profileInput)
  data!: JobProfileOrganizationUpdateWithoutJob_profileInput;
}
