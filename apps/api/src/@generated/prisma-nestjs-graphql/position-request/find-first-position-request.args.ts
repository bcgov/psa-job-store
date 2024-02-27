import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionRequestWhereInput } from './position-request-where.input';
import { Type } from 'class-transformer';
import { PositionRequestOrderByWithRelationAndSearchRelevanceInput } from './position-request-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { Int } from '@nestjs/graphql';
import { PositionRequestScalarFieldEnum } from './position-request-scalar-field.enum';

@ArgsType()
export class FindFirstPositionRequestArgs {
  @Field(() => PositionRequestWhereInput, { nullable: true })
  @Type(() => PositionRequestWhereInput)
  where?: PositionRequestWhereInput;

  @Field(() => [PositionRequestOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<PositionRequestOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => PositionRequestWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [PositionRequestScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof PositionRequestScalarFieldEnum>;
}
