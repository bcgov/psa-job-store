import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateManyStreamInputEnvelope } from './job-profile-stream-link-create-many-stream-input-envelope.input';
import { JobProfileStreamLinkCreateOrConnectWithoutStreamInput } from './job-profile-stream-link-create-or-connect-without-stream.input';
import { JobProfileStreamLinkCreateWithoutStreamInput } from './job-profile-stream-link-create-without-stream.input';
import { JobProfileStreamLinkScalarWhereInput } from './job-profile-stream-link-scalar-where.input';
import { JobProfileStreamLinkUpdateManyWithWhereWithoutStreamInput } from './job-profile-stream-link-update-many-with-where-without-stream.input';
import { JobProfileStreamLinkUpdateWithWhereUniqueWithoutStreamInput } from './job-profile-stream-link-update-with-where-unique-without-stream.input';
import { JobProfileStreamLinkUpsertWithWhereUniqueWithoutStreamInput } from './job-profile-stream-link-upsert-with-where-unique-without-stream.input';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';

@InputType()
export class JobProfileStreamLinkUpdateManyWithoutStreamNestedInput {
  @Field(() => [JobProfileStreamLinkCreateWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileStreamLinkCreateWithoutStreamInput)
  create?: Array<JobProfileStreamLinkCreateWithoutStreamInput>;

  @Field(() => [JobProfileStreamLinkCreateOrConnectWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileStreamLinkCreateOrConnectWithoutStreamInput)
  connectOrCreate?: Array<JobProfileStreamLinkCreateOrConnectWithoutStreamInput>;

  @Field(() => [JobProfileStreamLinkUpsertWithWhereUniqueWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileStreamLinkUpsertWithWhereUniqueWithoutStreamInput)
  upsert?: Array<JobProfileStreamLinkUpsertWithWhereUniqueWithoutStreamInput>;

  @Field(() => JobProfileStreamLinkCreateManyStreamInputEnvelope, { nullable: true })
  @Type(() => JobProfileStreamLinkCreateManyStreamInputEnvelope)
  createMany?: JobProfileStreamLinkCreateManyStreamInputEnvelope;

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

  @Field(() => [JobProfileStreamLinkUpdateWithWhereUniqueWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileStreamLinkUpdateWithWhereUniqueWithoutStreamInput)
  update?: Array<JobProfileStreamLinkUpdateWithWhereUniqueWithoutStreamInput>;

  @Field(() => [JobProfileStreamLinkUpdateManyWithWhereWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileStreamLinkUpdateManyWithWhereWithoutStreamInput)
  updateMany?: Array<JobProfileStreamLinkUpdateManyWithWhereWithoutStreamInput>;

  @Field(() => [JobProfileStreamLinkScalarWhereInput], { nullable: true })
  @Type(() => JobProfileStreamLinkScalarWhereInput)
  deleteMany?: Array<JobProfileStreamLinkScalarWhereInput>;
}
