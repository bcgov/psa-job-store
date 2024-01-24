import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkCreateWithoutJobFamilyInput } from './job-profile-job-family-link-create-without-job-family.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkCreateOrConnectWithoutJobFamilyInput } from './job-profile-job-family-link-create-or-connect-without-job-family.input';
import { JobProfileJobFamilyLinkCreateManyJobFamilyInputEnvelope } from './job-profile-job-family-link-create-many-job-family-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';

@InputType()
export class JobProfileJobFamilyLinkCreateNestedManyWithoutJobFamilyInput {
  @Field(() => [JobProfileJobFamilyLinkCreateWithoutJobFamilyInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkCreateWithoutJobFamilyInput)
  create?: Array<JobProfileJobFamilyLinkCreateWithoutJobFamilyInput>;

  @Field(() => [JobProfileJobFamilyLinkCreateOrConnectWithoutJobFamilyInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkCreateOrConnectWithoutJobFamilyInput)
  connectOrCreate?: Array<JobProfileJobFamilyLinkCreateOrConnectWithoutJobFamilyInput>;

  @Field(() => JobProfileJobFamilyLinkCreateManyJobFamilyInputEnvelope, { nullable: true })
  @Type(() => JobProfileJobFamilyLinkCreateManyJobFamilyInputEnvelope)
  createMany?: JobProfileJobFamilyLinkCreateManyJobFamilyInputEnvelope;

  @Field(() => [JobProfileJobFamilyLinkWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>>;
}
