import { ArgsType, Field, HideField, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { LocationOrderByWithRelationAndSearchRelevanceInput } from './location-order-by-with-relation-and-search-relevance.input';
import { LocationScalarFieldEnum } from './location-scalar-field.enum';
import { LocationWhereUniqueInput } from './location-where-unique.input';
import { LocationWhereInput } from './location-where.input';

@ArgsType()
export class FindManyLocationArgs {
  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;

  @Field(() => [LocationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<LocationOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof LocationScalarFieldEnum>;
}
