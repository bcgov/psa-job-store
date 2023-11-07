import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';
import { Type } from 'class-transformer';
import { ClassificationOrderByWithRelationAndSearchRelevanceInput } from './classification-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ClassificationScalarFieldEnum } from './classification-scalar-field.enum';

@ArgsType()
export class FindFirstClassificationArgs {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;

  @Field(() => [ClassificationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<ClassificationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ClassificationScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof ClassificationScalarFieldEnum>;
}
