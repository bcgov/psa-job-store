import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobCategoryWhereInput } from './job-category-where.input';
import { Type } from 'class-transformer';
import { JobCategoryOrderByWithRelationAndSearchRelevanceInput } from './job-category-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobCategoryWhereUniqueInput } from './job-category-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobCategoryScalarFieldEnum } from './job-category-scalar-field.enum';

@ArgsType()
export class FindFirstJobCategoryArgs {
  @Field(() => JobCategoryWhereInput, { nullable: true })
  @Type(() => JobCategoryWhereInput)
  where?: JobCategoryWhereInput;

  @Field(() => [JobCategoryOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobCategoryOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobCategoryWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobCategoryWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobCategoryScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobCategoryScalarFieldEnum>;
}
