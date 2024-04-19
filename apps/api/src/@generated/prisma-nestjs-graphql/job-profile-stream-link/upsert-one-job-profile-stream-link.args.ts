import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateInput } from './job-profile-stream-link-create.input';
import { JobProfileStreamLinkUpdateInput } from './job-profile-stream-link-update.input';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';

@ArgsType()
export class UpsertOneJobProfileStreamLinkArgs {
  @Field(() => JobProfileStreamLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;

  @Field(() => JobProfileStreamLinkCreateInput, { nullable: false })
  @Type(() => JobProfileStreamLinkCreateInput)
  create!: JobProfileStreamLinkCreateInput;

  @Field(() => JobProfileStreamLinkUpdateInput, { nullable: false })
  @Type(() => JobProfileStreamLinkUpdateInput)
  update!: JobProfileStreamLinkUpdateInput;
}
