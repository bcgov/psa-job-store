import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkUpdateWithoutJobProfileInput } from './job-profile-job-family-link-update-without-job-profile.input';
import { JobProfileJobFamilyLinkCreateWithoutJobProfileInput } from './job-profile-job-family-link-create-without-job-profile.input';

@InputType()
export class JobProfileJobFamilyLinkUpsertWithWhereUniqueWithoutJobProfileInput {
  @Field(() => JobProfileJobFamilyLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>;

  @Field(() => JobProfileJobFamilyLinkUpdateWithoutJobProfileInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkUpdateWithoutJobProfileInput)
  update!: JobProfileJobFamilyLinkUpdateWithoutJobProfileInput;

  @Field(() => JobProfileJobFamilyLinkCreateWithoutJobProfileInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkCreateWithoutJobProfileInput)
  create!: JobProfileJobFamilyLinkCreateWithoutJobProfileInput;
}
