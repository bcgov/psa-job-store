import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkOrderByWithRelationAndSearchRelevanceInput } from './job-profile-job-family-link-order-by-with-relation-and-search-relevance.input';
import { JobProfileJobFamilyLinkScalarFieldEnum } from './job-profile-job-family-link-scalar-field.enum';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';
import { JobProfileJobFamilyLinkWhereInput } from './job-profile-job-family-link-where.input';

@ArgsType()
export class FindFirstJobProfileJobFamilyLinkOrThrowArgs {
  @Field(() => JobProfileJobFamilyLinkWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyLinkWhereInput)
  where?: JobProfileJobFamilyLinkWhereInput;

  @Field(() => [JobProfileJobFamilyLinkOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileJobFamilyLinkOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileJobFamilyLinkWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileJobFamilyLinkScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileJobFamilyLinkScalarFieldEnum>;
}
