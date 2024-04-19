import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkUpdateInput } from './job-profile-stream-link-update.input';
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
