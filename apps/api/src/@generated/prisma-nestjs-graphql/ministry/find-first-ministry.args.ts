import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MinistryWhereInput } from './ministry-where.input';
import { Type } from 'class-transformer';
import { MinistryOrderByWithRelationAndSearchRelevanceInput } from './ministry-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { MinistryWhereUniqueInput } from './ministry-where-unique.input';
import { Int } from '@nestjs/graphql';
import { MinistryScalarFieldEnum } from './ministry-scalar-field.enum';

@ArgsType()
export class FindFirstMinistryArgs {
  @Field(() => MinistryWhereInput, { nullable: true })
  @Type(() => MinistryWhereInput)
  where?: MinistryWhereInput;

  @Field(() => [MinistryOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<MinistryOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => MinistryWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<MinistryWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [MinistryScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof MinistryScalarFieldEnum>;
}
