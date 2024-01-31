import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateWithoutJobProfileInput } from './job-profile-stream-link-create-without-job-profile.input';

@InputType()
export class JobProfileStreamLinkCreateOrConnectWithoutJobProfileInput {
  @Field(() => JobProfileStreamLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;

  @Field(() => JobProfileStreamLinkCreateWithoutJobProfileInput, { nullable: false })
  @Type(() => JobProfileStreamLinkCreateWithoutJobProfileInput)
  create!: JobProfileStreamLinkCreateWithoutJobProfileInput;
}
