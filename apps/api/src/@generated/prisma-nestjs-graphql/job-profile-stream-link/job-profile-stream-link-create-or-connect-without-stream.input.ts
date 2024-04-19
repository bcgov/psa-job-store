import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateWithoutStreamInput } from './job-profile-stream-link-create-without-stream.input';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';

@InputType()
export class JobProfileStreamLinkCreateOrConnectWithoutStreamInput {
  @Field(() => JobProfileStreamLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;

  @Field(() => JobProfileStreamLinkCreateWithoutStreamInput, { nullable: false })
  @Type(() => JobProfileStreamLinkCreateWithoutStreamInput)
  create!: JobProfileStreamLinkCreateWithoutStreamInput;
}
