import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkWhereInput } from './job-profile-job-family-link-where.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkOrderByWithRelationAndSearchRelevanceInput } from './job-profile-job-family-link-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyLinkWhereUniqueInput } from './job-profile-job-family-link-where-unique.input';
import { HideField } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkScalarFieldEnum } from './job-profile-job-family-link-scalar-field.enum';

@ArgsType()
export class FindManyJobProfileJobFamilyLinkArgs {
  @Field(() => JobProfileJobFamilyLinkWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyLinkWhereInput)
  where?: JobProfileJobFamilyLinkWhereInput;

  @Field(() => [JobProfileJobFamilyLinkOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileJobFamilyLinkOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<JobProfileJobFamilyLinkWhereUniqueInput, 'jobProfileId_jobFamilyId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof JobProfileJobFamilyLinkScalarFieldEnum>;
}
