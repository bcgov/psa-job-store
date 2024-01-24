import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamLinkCreateWithoutJobProfileInput } from './job-profile-stream-link-create-without-job-profile.input';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateOrConnectWithoutJobProfileInput } from './job-profile-stream-link-create-or-connect-without-job-profile.input';
import { JobProfileStreamLinkUpsertWithWhereUniqueWithoutJobProfileInput } from './job-profile-stream-link-upsert-with-where-unique-without-job-profile.input';
import { JobProfileStreamLinkCreateManyJobProfileInputEnvelope } from './job-profile-stream-link-create-many-job-profile-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';
import { JobProfileStreamLinkUpdateWithWhereUniqueWithoutJobProfileInput } from './job-profile-stream-link-update-with-where-unique-without-job-profile.input';
import { JobProfileStreamLinkUpdateManyWithWhereWithoutJobProfileInput } from './job-profile-stream-link-update-many-with-where-without-job-profile.input';
import { JobProfileStreamLinkScalarWhereInput } from './job-profile-stream-link-scalar-where.input';

@InputType()
export class JobProfileStreamLinkUpdateManyWithoutJobProfileNestedInput {
  @Field(() => [JobProfileStreamLinkCreateWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileStreamLinkCreateWithoutJobProfileInput)
  create?: Array<JobProfileStreamLinkCreateWithoutJobProfileInput>;

  @Field(() => [JobProfileStreamLinkCreateOrConnectWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileStreamLinkCreateOrConnectWithoutJobProfileInput)
  connectOrCreate?: Array<JobProfileStreamLinkCreateOrConnectWithoutJobProfileInput>;

  @Field(() => [JobProfileStreamLinkUpsertWithWhereUniqueWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileStreamLinkUpsertWithWhereUniqueWithoutJobProfileInput)
  upsert?: Array<JobProfileStreamLinkUpsertWithWhereUniqueWithoutJobProfileInput>;

  @Field(() => JobProfileStreamLinkCreateManyJobProfileInputEnvelope, { nullable: true })
  @Type(() => JobProfileStreamLinkCreateManyJobProfileInputEnvelope)
  createMany?: JobProfileStreamLinkCreateManyJobProfileInputEnvelope;

  @Field(() => [JobProfileStreamLinkWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  set?: Array<Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>>;

  @Field(() => [JobProfileStreamLinkWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>>;

  @Field(() => [JobProfileStreamLinkWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>>;

  @Field(() => [JobProfileStreamLinkWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>>;

  @Field(() => [JobProfileStreamLinkUpdateWithWhereUniqueWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileStreamLinkUpdateWithWhereUniqueWithoutJobProfileInput)
  update?: Array<JobProfileStreamLinkUpdateWithWhereUniqueWithoutJobProfileInput>;

  @Field(() => [JobProfileStreamLinkUpdateManyWithWhereWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileStreamLinkUpdateManyWithWhereWithoutJobProfileInput)
  updateMany?: Array<JobProfileStreamLinkUpdateManyWithWhereWithoutJobProfileInput>;

  @Field(() => [JobProfileStreamLinkScalarWhereInput], { nullable: true })
  @Type(() => JobProfileStreamLinkScalarWhereInput)
  deleteMany?: Array<JobProfileStreamLinkScalarWhereInput>;
}
