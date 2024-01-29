import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueJobProfileOrganizationArgs {
  @Field(() => JobProfileOrganizationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>;
}
