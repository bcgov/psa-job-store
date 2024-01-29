import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamLinkCreateWithoutStreamInput } from './job-profile-stream-link-create-without-stream.input';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateOrConnectWithoutStreamInput } from './job-profile-stream-link-create-or-connect-without-stream.input';
import { JobProfileStreamLinkCreateManyStreamInputEnvelope } from './job-profile-stream-link-create-many-stream-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';

@InputType()
export class JobProfileStreamLinkUncheckedCreateNestedManyWithoutStreamInput {
  @Field(() => [JobProfileStreamLinkCreateWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileStreamLinkCreateWithoutStreamInput)
  create?: Array<JobProfileStreamLinkCreateWithoutStreamInput>;

  @Field(() => [JobProfileStreamLinkCreateOrConnectWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileStreamLinkCreateOrConnectWithoutStreamInput)
  connectOrCreate?: Array<JobProfileStreamLinkCreateOrConnectWithoutStreamInput>;

  @Field(() => JobProfileStreamLinkCreateManyStreamInputEnvelope, { nullable: true })
  @Type(() => JobProfileStreamLinkCreateManyStreamInputEnvelope)
  createMany?: JobProfileStreamLinkCreateManyStreamInputEnvelope;

  @Field(() => [JobProfileStreamLinkWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>>;
}
