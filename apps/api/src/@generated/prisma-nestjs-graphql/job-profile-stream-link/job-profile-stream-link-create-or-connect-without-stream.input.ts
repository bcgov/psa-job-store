import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateWithoutStreamInput } from './job-profile-stream-link-create-without-stream.input';

@InputType()
export class JobProfileStreamLinkCreateOrConnectWithoutStreamInput {
  @Field(() => JobProfileStreamLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;

  @Field(() => JobProfileStreamLinkCreateWithoutStreamInput, { nullable: false })
  @Type(() => JobProfileStreamLinkCreateWithoutStreamInput)
  create!: JobProfileStreamLinkCreateWithoutStreamInput;
}
