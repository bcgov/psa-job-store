import { ArgsType, Field, HideField, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkOrderByWithRelationAndSearchRelevanceInput } from './job-profile-stream-link-order-by-with-relation-and-search-relevance.input';
import { JobProfileStreamLinkScalarFieldEnum } from './job-profile-stream-link-scalar-field.enum';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';
import { JobProfileStreamLinkWhereInput } from './job-profile-stream-link-where.input';

@ArgsType()
export class FindManyJobProfileStreamLinkArgs {
  @Field(() => JobProfileStreamLinkWhereInput, { nullable: true })
  @Type(() => JobProfileStreamLinkWhereInput)
  where?: JobProfileStreamLinkWhereInput;

  @Field(() => [JobProfileStreamLinkOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileStreamLinkOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof JobProfileStreamLinkScalarFieldEnum>;
}
