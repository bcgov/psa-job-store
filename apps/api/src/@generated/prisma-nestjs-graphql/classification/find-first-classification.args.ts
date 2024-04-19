import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { ClassificationOrderByWithRelationAndSearchRelevanceInput } from './classification-order-by-with-relation-and-search-relevance.input';
import { ClassificationScalarFieldEnum } from './classification-scalar-field.enum';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { ClassificationWhereInput } from './classification-where.input';

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
