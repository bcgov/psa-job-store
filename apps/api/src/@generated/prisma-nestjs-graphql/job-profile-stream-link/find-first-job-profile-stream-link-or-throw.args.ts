import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileStreamLinkWhereInput } from './job-profile-stream-link-where.input';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkOrderByWithRelationAndSearchRelevanceInput } from './job-profile-stream-link-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileStreamLinkWhereUniqueInput } from './job-profile-stream-link-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileStreamLinkScalarFieldEnum } from './job-profile-stream-link-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileStreamLinkOrThrowArgs {
  @Field(() => JobProfileStreamLinkWhereInput, { nullable: true })
  @Type(() => JobProfileStreamLinkWhereInput)
  where?: JobProfileStreamLinkWhereInput;

  @Field(() => [JobProfileStreamLinkOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileStreamLinkOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileStreamLinkWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileStreamLinkWhereUniqueInput, 'jobProfileId_streamId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileStreamLinkScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileStreamLinkScalarFieldEnum>;
}
