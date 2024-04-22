import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkCreateManyJobFamilyInputEnvelope } from './job-profile-job-family-link-create-many-job-family-input-envelope.input';
import { JobProfileJobFamilyLinkCreateOrConnectWithoutJobFamilyInput } from './job-profile-job-family-link-create-or-connect-without-job-family.input';
import { JobProfileJobFamilyLinkCreateWithoutJobFamilyInput } from './job-profile-job-family-link-create-without-job-family.input';
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
