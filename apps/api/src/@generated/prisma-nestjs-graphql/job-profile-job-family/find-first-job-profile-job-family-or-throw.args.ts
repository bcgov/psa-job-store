import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput } from './job-profile-job-family-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileJobFamilyScalarFieldEnum } from './job-profile-job-family-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileJobFamilyOrThrowArgs {
  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  where?: JobProfileJobFamilyWhereInput;

  @Field(() => [JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileJobFamilyScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileJobFamilyScalarFieldEnum>;
}
