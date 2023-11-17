import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionWhereInput } from './position-where.input';
import { Type } from 'class-transformer';
import { PositionOrderByWithRelationAndSearchRelevanceInput } from './position-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { Int } from '@nestjs/graphql';
import { PositionScalarFieldEnum } from './position-scalar-field.enum';

@ArgsType()
export class FindFirstPositionOrThrowArgs {
  @Field(() => PositionWhereInput, { nullable: true })
  @Type(() => PositionWhereInput)
  where?: PositionWhereInput;

  @Field(() => [PositionOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<PositionOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => PositionWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [PositionScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof PositionScalarFieldEnum>;
}
