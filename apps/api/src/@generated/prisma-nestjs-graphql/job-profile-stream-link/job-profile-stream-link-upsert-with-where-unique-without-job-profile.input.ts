import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateWithoutJobProfileInput } from './job-profile-stream-link-create-without-job-profile.input';
import { JobProfileStreamLinkUpdateWithoutJobProfileInput } from './job-profile-stream-link-update-without-job-profile.input';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';

@InputType()
export class JobProfileStreamLinkUpsertWithWhereUniqueWithoutJobProfileInput {
  @Field(() => JobProfileStreamLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;

  @Field(() => JobProfileStreamLinkUpdateWithoutJobProfileInput, { nullable: false })
  @Type(() => JobProfileStreamLinkUpdateWithoutJobProfileInput)
  update!: JobProfileStreamLinkUpdateWithoutJobProfileInput;

  @Field(() => JobProfileStreamLinkCreateWithoutJobProfileInput, { nullable: false })
  @Type(() => JobProfileStreamLinkCreateWithoutJobProfileInput)
  create!: JobProfileStreamLinkCreateWithoutJobProfileInput;
}
