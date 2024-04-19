import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkCreateWithoutJobFamilyInput } from './job-profile-job-family-link-create-without-job-family.input';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';

@InputType()
export class JobProfileJobFamilyLinkCreateOrConnectWithoutJobFamilyInput {
  @Field(() => JobProfileJobFamilyLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>;

  @Field(() => JobProfileJobFamilyLinkCreateWithoutJobFamilyInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkCreateWithoutJobFamilyInput)
  create!: JobProfileJobFamilyLinkCreateWithoutJobFamilyInput;
}
