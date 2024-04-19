import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkCreateManyJobProfileInputEnvelope } from './job-profile-job-family-link-create-many-job-profile-input-envelope.input';
import { JobProfileJobFamilyLinkCreateOrConnectWithoutJobProfileInput } from './job-profile-job-family-link-create-or-connect-without-job-profile.input';
import { JobProfileJobFamilyLinkCreateWithoutJobProfileInput } from './job-profile-job-family-link-create-without-job-profile.input';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';

@InputType()
export class JobProfileJobFamilyLinkCreateNestedManyWithoutJobProfileInput {
  @Field(() => [JobProfileJobFamilyLinkCreateWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkCreateWithoutJobProfileInput)
  create?: Array<JobProfileJobFamilyLinkCreateWithoutJobProfileInput>;

  @Field(() => [JobProfileJobFamilyLinkCreateOrConnectWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkCreateOrConnectWithoutJobProfileInput)
  connectOrCreate?: Array<JobProfileJobFamilyLinkCreateOrConnectWithoutJobProfileInput>;

  @Field(() => JobProfileJobFamilyLinkCreateManyJobProfileInputEnvelope, { nullable: true })
  @Type(() => JobProfileJobFamilyLinkCreateManyJobProfileInputEnvelope)
  createMany?: JobProfileJobFamilyLinkCreateManyJobProfileInputEnvelope;

  @Field(() => [JobProfileJobFamilyLinkWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>>;
}
