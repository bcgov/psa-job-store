import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LocationWhereInput } from './location-where.input';
import { Type } from 'class-transformer';
import { LocationOrderByWithRelationAndSearchRelevanceInput } from './location-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { LocationWhereUniqueInput } from './location-where-unique.input';
import { Int } from '@nestjs/graphql';
import { LocationScalarFieldEnum } from './location-scalar-field.enum';

@ArgsType()
export class FindFirstLocationOrThrowArgs {
  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;

  @Field(() => [LocationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<LocationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => LocationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [LocationScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof LocationScalarFieldEnum>;
}
