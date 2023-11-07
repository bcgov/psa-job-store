import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CareerGroupWhereInput } from './career-group-where.input';
import { Type } from 'class-transformer';
import { CareerGroupOrderByWithRelationAndSearchRelevanceInput } from './career-group-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { CareerGroupWhereUniqueInput } from './career-group-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CareerGroupScalarFieldEnum } from './career-group-scalar-field.enum';

@ArgsType()
export class FindFirstCareerGroupOrThrowArgs {
  @Field(() => CareerGroupWhereInput, { nullable: true })
  @Type(() => CareerGroupWhereInput)
  where?: CareerGroupWhereInput;

  @Field(() => [CareerGroupOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<CareerGroupOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => CareerGroupWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<CareerGroupWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [CareerGroupScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof CareerGroupScalarFieldEnum>;
}
