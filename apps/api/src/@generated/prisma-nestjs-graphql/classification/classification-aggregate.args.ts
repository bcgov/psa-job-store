import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { ClassificationCountAggregateInput } from './classification-count-aggregate.input';
import { ClassificationMaxAggregateInput } from './classification-max-aggregate.input';
import { ClassificationMinAggregateInput } from './classification-min-aggregate.input';
import { ClassificationOrderByWithRelationAndSearchRelevanceInput } from './classification-order-by-with-relation-and-search-relevance.input';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { ClassificationWhereInput } from './classification-where.input';

@ArgsType()
export class ClassificationAggregateArgs {
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

  @Field(() => ClassificationCountAggregateInput, { nullable: true })
  _count?: ClassificationCountAggregateInput;

  @Field(() => ClassificationMinAggregateInput, { nullable: true })
  _min?: ClassificationMinAggregateInput;

  @Field(() => ClassificationMaxAggregateInput, { nullable: true })
  _max?: ClassificationMaxAggregateInput;
}
