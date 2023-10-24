import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GridWhereInput } from './grid-where.input';
import { Type } from 'class-transformer';
import { GridOrderByWithRelationAndSearchRelevanceInput } from './grid-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { GridWhereUniqueInput } from './grid-where-unique.input';
import { HideField } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GridScalarFieldEnum } from './grid-scalar-field.enum';

@ArgsType()
export class FindManyGridArgs {
  @Field(() => GridWhereInput, { nullable: true })
  @Type(() => GridWhereInput)
  where?: GridWhereInput;

  @Field(() => [GridOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<GridOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<GridWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof GridScalarFieldEnum>;
}
