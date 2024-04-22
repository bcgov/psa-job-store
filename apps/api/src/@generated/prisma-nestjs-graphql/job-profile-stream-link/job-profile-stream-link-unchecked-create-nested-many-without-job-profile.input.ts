import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateManyJobProfileInputEnvelope } from './job-profile-stream-link-create-many-job-profile-input-envelope.input';
import { JobProfileStreamLinkCreateOrConnectWithoutJobProfileInput } from './job-profile-stream-link-create-or-connect-without-job-profile.input';
import { JobProfileStreamLinkCreateWithoutJobProfileInput } from './job-profile-stream-link-create-without-job-profile.input';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';

@InputType()
export class JobProfileStreamLinkUncheckedCreateNestedManyWithoutJobProfileInput {
  @Field(() => [JobProfileStreamLinkCreateWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileStreamLinkCreateWithoutJobProfileInput)
  create?: Array<JobProfileStreamLinkCreateWithoutJobProfileInput>;

  @Field(() => [JobProfileStreamLinkCreateOrConnectWithoutJobProfileInput], { nullable: true })
  @Type(() => JobProfileStreamLinkCreateOrConnectWithoutJobProfileInput)
  connectOrCreate?: Array<JobProfileStreamLinkCreateOrConnectWithoutJobProfileInput>;

  @Field(() => JobProfileStreamLinkCreateManyJobProfileInputEnvelope, { nullable: true })
  @Type(() => JobProfileStreamLinkCreateManyJobProfileInputEnvelope)
  createMany?: JobProfileStreamLinkCreateManyJobProfileInputEnvelope;

  @Field(() => [JobProfileStreamLinkWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>>;
}
