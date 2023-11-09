import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OccupationGroupWhereInput } from './occupation-group-where.input';
import { Type } from 'class-transformer';
import { OccupationGroupOrderByWithRelationAndSearchRelevanceInput } from './occupation-group-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { OccupationGroupWhereUniqueInput } from './occupation-group-where-unique.input';
import { Int } from '@nestjs/graphql';
import { OccupationGroupScalarFieldEnum } from './occupation-group-scalar-field.enum';

@ArgsType()
export class FindFirstOccupationGroupArgs {
  @Field(() => OccupationGroupWhereInput, { nullable: true })
  @Type(() => OccupationGroupWhereInput)
  where?: OccupationGroupWhereInput;

  @Field(() => [OccupationGroupOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<OccupationGroupOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => OccupationGroupWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<OccupationGroupWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [OccupationGroupScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof OccupationGroupScalarFieldEnum>;
}
