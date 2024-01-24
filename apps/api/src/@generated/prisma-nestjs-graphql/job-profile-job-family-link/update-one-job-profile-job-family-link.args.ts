import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkUpdateInput } from './job-profile-job-family-link-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileJobFamilyLinkArgs {
  @Field(() => JobProfileJobFamilyLinkUpdateInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkUpdateInput)
  data!: JobProfileJobFamilyLinkUpdateInput;

  @Field(() => JobProfileJobFamilyLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>;
}
