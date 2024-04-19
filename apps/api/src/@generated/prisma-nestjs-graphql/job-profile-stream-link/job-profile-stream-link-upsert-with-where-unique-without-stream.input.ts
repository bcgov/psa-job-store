import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateWithoutStreamInput } from './job-profile-stream-link-create-without-stream.input';
import { JobProfileStreamLinkUpdateWithoutStreamInput } from './job-profile-stream-link-update-without-stream.input';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';

@InputType()
export class JobProfileStreamLinkUpsertWithWhereUniqueWithoutStreamInput {
  @Field(() => JobProfileStreamLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;

  @Field(() => JobProfileStreamLinkUpdateWithoutStreamInput, { nullable: false })
  @Type(() => JobProfileStreamLinkUpdateWithoutStreamInput)
  update!: JobProfileStreamLinkUpdateWithoutStreamInput;

  @Field(() => JobProfileStreamLinkCreateWithoutStreamInput, { nullable: false })
  @Type(() => JobProfileStreamLinkCreateWithoutStreamInput)
  create!: JobProfileStreamLinkCreateWithoutStreamInput;
}
