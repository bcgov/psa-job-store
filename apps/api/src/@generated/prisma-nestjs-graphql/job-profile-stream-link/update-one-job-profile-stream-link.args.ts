import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileStreamLinkUpdateInput } from './job-profile-stream-link-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileStreamLinkArgs {
  @Field(() => JobProfileStreamLinkUpdateInput, { nullable: false })
  @Type(() => JobProfileStreamLinkUpdateInput)
  data!: JobProfileStreamLinkUpdateInput;

  @Field(() => JobProfileStreamLinkWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamLinkWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;
}
