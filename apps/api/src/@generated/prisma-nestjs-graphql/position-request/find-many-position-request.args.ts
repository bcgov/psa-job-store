import { ArgsType, Field, HideField, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestOrderByWithRelationAndSearchRelevanceInput } from './position-request-order-by-with-relation-and-search-relevance.input';
import { PositionRequestScalarFieldEnum } from './position-request-scalar-field.enum';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { PositionRequestWhereInput } from './position-request-where.input';

@ArgsType()
export class FindManyPositionRequestArgs {
  @Field(() => PositionRequestWhereInput, { nullable: true })
  @Type(() => PositionRequestWhereInput)
  where?: PositionRequestWhereInput;

  @Field(() => [PositionRequestOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<PositionRequestOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof PositionRequestScalarFieldEnum>;
}
