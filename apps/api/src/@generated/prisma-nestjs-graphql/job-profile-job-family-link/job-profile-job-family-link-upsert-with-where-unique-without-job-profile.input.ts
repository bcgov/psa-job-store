import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkCreateWithoutJobProfileInput } from './job-profile-job-family-link-create-without-job-profile.input';
import { JobProfileJobFamilyLinkUpdateWithoutJobProfileInput } from './job-profile-job-family-link-update-without-job-profile.input';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';

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
