import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileOrganizationCreateWithoutJob_profileInput } from './job-profile-organization-create-without-job-profile.input';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';

@InputType()
export class JobProfileOrganizationCreateOrConnectWithoutJob_profileInput {
  @Field(() => JobProfileOrganizationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>;

  @Field(() => JobProfileOrganizationCreateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileOrganizationCreateWithoutJob_profileInput)
  create!: JobProfileOrganizationCreateWithoutJob_profileInput;
}
