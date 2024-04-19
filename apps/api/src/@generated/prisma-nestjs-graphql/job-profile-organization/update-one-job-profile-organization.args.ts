import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileOrganizationUpdateInput } from './job-profile-organization-update.input';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileOrganizationArgs {
  @Field(() => JobProfileOrganizationUpdateInput, { nullable: false })
  @Type(() => JobProfileOrganizationUpdateInput)
  data!: JobProfileOrganizationUpdateInput;

  @Field(() => JobProfileOrganizationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>;
}
