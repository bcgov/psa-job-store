import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkUpdateWithoutJobFamilyInput } from './job-profile-job-family-link-update-without-job-family.input';

@InputType()
export class JobProfileJobFamilyLinkUpdateWithWhereUniqueWithoutJobFamilyInput {
  @Field(() => JobProfileJobFamilyLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>;

  @Field(() => JobProfileJobFamilyLinkUpdateWithoutJobFamilyInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkUpdateWithoutJobFamilyInput)
  data!: JobProfileJobFamilyLinkUpdateWithoutJobFamilyInput;
}
