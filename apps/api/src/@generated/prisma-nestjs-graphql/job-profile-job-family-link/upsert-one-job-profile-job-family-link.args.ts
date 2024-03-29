import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkCreateInput } from './job-profile-job-family-link-create.input';
import { JobProfileJobFamilyLinkUpdateInput } from './job-profile-job-family-link-update.input';

@ArgsType()
export class UpsertOneJobProfileJobFamilyLinkArgs {
  @Field(() => JobProfileJobFamilyLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>;

  @Field(() => JobProfileJobFamilyLinkCreateInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkCreateInput)
  create!: JobProfileJobFamilyLinkCreateInput;

  @Field(() => JobProfileJobFamilyLinkUpdateInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkUpdateInput)
  update!: JobProfileJobFamilyLinkUpdateInput;
}
