import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkUpdateWithoutStreamInput } from './job-profile-stream-link-update-without-stream.input';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';

@InputType()
export class JobProfileStreamLinkUpdateWithWhereUniqueWithoutStreamInput {
  @Field(() => JobProfileStreamLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;

  @Field(() => JobProfileStreamLinkUpdateWithoutStreamInput, { nullable: false })
  @Type(() => JobProfileStreamLinkUpdateWithoutStreamInput)
  data!: JobProfileStreamLinkUpdateWithoutStreamInput;
}
