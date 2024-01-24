import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkUpdateWithoutJobProfileInput } from './job-profile-stream-link-update-without-job-profile.input';

@InputType()
export class JobProfileStreamLinkUpdateWithWhereUniqueWithoutJobProfileInput {
  @Field(() => JobProfileStreamLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;

  @Field(() => JobProfileStreamLinkUpdateWithoutJobProfileInput, { nullable: false })
  @Type(() => JobProfileStreamLinkUpdateWithoutJobProfileInput)
  data!: JobProfileStreamLinkUpdateWithoutJobProfileInput;
}
