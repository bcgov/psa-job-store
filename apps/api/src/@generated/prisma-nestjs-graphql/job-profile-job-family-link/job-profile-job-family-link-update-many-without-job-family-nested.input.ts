import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkCreateManyJobFamilyInputEnvelope } from './job-profile-job-family-link-create-many-job-family-input-envelope.input';
import { JobProfileJobFamilyLinkCreateOrConnectWithoutJobFamilyInput } from './job-profile-job-family-link-create-or-connect-without-job-family.input';
import { JobProfileJobFamilyLinkCreateWithoutJobFamilyInput } from './job-profile-job-family-link-create-without-job-family.input';
import { JobProfileJobFamilyLinkScalarWhereInput } from './job-profile-job-family-link-scalar-where.input';
import { JobProfileJobFamilyLinkUpdateManyWithWhereWithoutJobFamilyInput } from './job-profile-job-family-link-update-many-with-where-without-job-family.input';
import { JobProfileJobFamilyLinkUpdateWithWhereUniqueWithoutJobFamilyInput } from './job-profile-job-family-link-update-with-where-unique-without-job-family.input';
import { JobProfileJobFamilyLinkUpsertWithWhereUniqueWithoutJobFamilyInput } from './job-profile-job-family-link-upsert-with-where-unique-without-job-family.input';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';

@InputType()
export class JobProfileJobFamilyLinkUpdateManyWithoutJobFamilyNestedInput {
  @Field(() => [JobProfileJobFamilyLinkCreateWithoutJobFamilyInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkCreateWithoutJobFamilyInput)
  create?: Array<JobProfileJobFamilyLinkCreateWithoutJobFamilyInput>;

  @Field(() => [JobProfileJobFamilyLinkCreateOrConnectWithoutJobFamilyInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkCreateOrConnectWithoutJobFamilyInput)
  connectOrCreate?: Array<JobProfileJobFamilyLinkCreateOrConnectWithoutJobFamilyInput>;

  @Field(() => [JobProfileJobFamilyLinkUpsertWithWhereUniqueWithoutJobFamilyInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkUpsertWithWhereUniqueWithoutJobFamilyInput)
  upsert?: Array<JobProfileJobFamilyLinkUpsertWithWhereUniqueWithoutJobFamilyInput>;

  @Field(() => JobProfileJobFamilyLinkCreateManyJobFamilyInputEnvelope, { nullable: true })
  @Type(() => JobProfileJobFamilyLinkCreateManyJobFamilyInputEnvelope)
  createMany?: JobProfileJobFamilyLinkCreateManyJobFamilyInputEnvelope;

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

  @Field(() => [JobProfileJobFamilyLinkUpdateWithWhereUniqueWithoutJobFamilyInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkUpdateWithWhereUniqueWithoutJobFamilyInput)
  update?: Array<JobProfileJobFamilyLinkUpdateWithWhereUniqueWithoutJobFamilyInput>;

  @Field(() => [JobProfileJobFamilyLinkUpdateManyWithWhereWithoutJobFamilyInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkUpdateManyWithWhereWithoutJobFamilyInput)
  updateMany?: Array<JobProfileJobFamilyLinkUpdateManyWithWhereWithoutJobFamilyInput>;

  @Field(() => [JobProfileJobFamilyLinkScalarWhereInput], { nullable: true })
  @Type(() => JobProfileJobFamilyLinkScalarWhereInput)
  deleteMany?: Array<JobProfileJobFamilyLinkScalarWhereInput>;
}
