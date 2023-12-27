import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileCareerGroupWhereInput } from './job-profile-career-group-where.input';
import { Type } from 'class-transformer';
import { JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput } from './job-profile-career-group-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileCareerGroupWhereUniqueInput } from './job-profile-career-group-where-unique.input';
import { HideField } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileCareerGroupScalarFieldEnum } from './job-profile-career-group-scalar-field.enum';

@ArgsType()
export class FindManyJobProfileCareerGroupArgs {
  @Field(() => JobProfileCareerGroupWhereInput, { nullable: true })
  @Type(() => JobProfileCareerGroupWhereInput)
  where?: JobProfileCareerGroupWhereInput;

  @Field(() => [JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<JobProfileCareerGroupWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof JobProfileCareerGroupScalarFieldEnum>;
}
