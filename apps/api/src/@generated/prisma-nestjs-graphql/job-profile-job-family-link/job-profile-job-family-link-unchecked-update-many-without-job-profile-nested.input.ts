import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkCreateWithoutJobProfileInput } from './job-profile-job-family-link-create-without-job-profile.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkCreateOrConnectWithoutJobProfileInput } from './job-profile-job-family-link-create-or-connect-without-job-profile.input';
import { JobProfileJobFamilyLinkUpsertWithWhereUniqueWithoutJobProfileInput } from './job-profile-job-family-link-upsert-with-where-unique-without-job-profile.input';
import { JobProfileJobFamilyLinkCreateManyJobProfileInputEnvelope } from './job-profile-job-family-link-create-many-job-profile-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';
import { JobProfileJobFamilyLinkUpdateWithWhereUniqueWithoutJobProfileInput } from './job-profile-job-family-link-update-with-where-unique-without-job-profile.input';
import { JobProfileJobFamilyLinkUpdateManyWithWhereWithoutJobProfileInput } from './job-profile-job-family-link-update-many-with-where-without-job-profile.input';
import { JobProfileJobFamilyLinkScalarWhereInput } from './job-profile-job-family-link-scalar-where.input';

@InputType()
export class JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobProfileNestedInput {
  @Field(() => [JobProfileJobFamilyLinkCreateWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkCreateWithoutJobProfileInput)
  create?: Array<JobProfileJobFamilyLinkCreateWithoutJobProfileInput>;

  @Field(() => [JobProfileJobFamilyLinkCreateOrConnectWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkCreateOrConnectWithoutJobProfileInput)
  connectOrCreate?: Array<JobProfileJobFamilyLinkCreateOrConnectWithoutJobProfileInput>;

  @Field(() => [JobProfileJobFamilyLinkUpsertWithWhereUniqueWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkUpsertWithWhereUniqueWithoutJobProfileInput)
  upsert?: Array<JobProfileJobFamilyLinkUpsertWithWhereUniqueWithoutJobProfileInput>;

  @Field(() => JobProfileJobFamilyLinkCreateManyJobProfileInputEnvelope, { nullable: true })
  @Type(() => JobProfileJobFamilyLinkCreateManyJobProfileInputEnvelope)
  createMany?: JobProfileJobFamilyLinkCreateManyJobProfileInputEnvelope;

  @Field(() => [JobProfileJobFamilyLinkWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkWhereUniqueInput)
  set?: Array<Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>>;

  @Field(() => [JobProfileJobFamilyLinkWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>>;

  @Field(() => [JobProfileJobFamilyLinkWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>>;

  @Field(() => [JobProfileJobFamilyLinkWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>>;

  @Field(() => [JobProfileJobFamilyLinkUpdateWithWhereUniqueWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkUpdateWithWhereUniqueWithoutJobProfileInput)
  update?: Array<JobProfileJobFamilyLinkUpdateWithWhereUniqueWithoutJobProfileInput>;

  @Field(() => [JobProfileJobFamilyLinkUpdateManyWithWhereWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkUpdateManyWithWhereWithoutJobProfileInput)
  updateMany?: Array<JobProfileJobFamilyLinkUpdateManyWithWhereWithoutJobProfileInput>;

  @Field(() => [JobProfileJobFamilyLinkScalarWhereInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkScalarWhereInput)
  deleteMany?: Array<JobProfileJobFamilyLinkScalarWhereInput>;
}
