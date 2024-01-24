import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileOrganizationUpdateWithoutJob_profileInput } from './job-profile-organization-update-without-job-profile.input';
import { JobProfileOrganizationCreateWithoutJob_profileInput } from './job-profile-organization-create-without-job-profile.input';

@InputType()
export class JobProfileOrganizationUpsertWithWhereUniqueWithoutJob_profileInput {
  @Field(() => JobProfileOrganizationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>;

  @Field(() => JobProfileOrganizationUpdateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileOrganizationUpdateWithoutJob_profileInput)
  update!: JobProfileOrganizationUpdateWithoutJob_profileInput;

  @Field(() => JobProfileOrganizationCreateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileOrganizationCreateWithoutJob_profileInput)
  create!: JobProfileOrganizationCreateWithoutJob_profileInput;
}
