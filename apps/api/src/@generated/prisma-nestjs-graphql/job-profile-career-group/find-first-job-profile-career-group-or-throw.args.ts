import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileCareerGroupWhereInput } from './job-profile-career-group-where.input';
import { Type } from 'class-transformer';
import { JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput } from './job-profile-career-group-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileCareerGroupWhereUniqueInput } from './job-profile-career-group-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileCareerGroupScalarFieldEnum } from './job-profile-career-group-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileCareerGroupOrThrowArgs {
  @Field(() => JobProfileCareerGroupWhereInput, { nullable: true })
  @Type(() => JobProfileCareerGroupWhereInput)
  where?: JobProfileCareerGroupWhereInput;

  @Field(() => [JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileCareerGroupWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileCareerGroupWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileCareerGroupScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileCareerGroupScalarFieldEnum>;
}
