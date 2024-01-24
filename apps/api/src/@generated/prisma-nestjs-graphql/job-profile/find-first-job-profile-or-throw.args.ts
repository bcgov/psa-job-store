import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { Type } from 'class-transformer';
import { JobProfileOrderByWithRelationAndSearchRelevanceInput } from './job-profile-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileScalarFieldEnum } from './job-profile-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileOrThrowArgs {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => [JobProfileOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileScalarFieldEnum>;
}
