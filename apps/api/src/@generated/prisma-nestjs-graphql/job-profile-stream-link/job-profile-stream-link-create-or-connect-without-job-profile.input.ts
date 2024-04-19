import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateWithoutJobProfileInput } from './job-profile-stream-link-create-without-job-profile.input';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';

@InputType()
export class JobProfileStreamLinkCreateOrConnectWithoutJobProfileInput {
  @Field(() => JobProfileStreamLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;

  @Field(() => JobProfileStreamLinkCreateWithoutJobProfileInput, { nullable: false })
  @Type(() => JobProfileStreamLinkCreateWithoutJobProfileInput)
  create!: JobProfileStreamLinkCreateWithoutJobProfileInput;
}
