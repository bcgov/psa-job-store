import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { DepartmentCountAggregateInput } from './department-count-aggregate.input';
import { DepartmentMaxAggregateInput } from './department-max-aggregate.input';
import { DepartmentMinAggregateInput } from './department-min-aggregate.input';
import { DepartmentOrderByWithRelationAndSearchRelevanceInput } from './department-order-by-with-relation-and-search-relevance.input';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { DepartmentWhereInput } from './department-where.input';

@ArgsType()
export class DepartmentAggregateArgs {
  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;

  @Field(() => [DepartmentOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<DepartmentOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => DepartmentCountAggregateInput, { nullable: true })
  _count?: DepartmentCountAggregateInput;

  @Field(() => DepartmentMinAggregateInput, { nullable: true })
  _min?: DepartmentMinAggregateInput;

  @Field(() => DepartmentMaxAggregateInput, { nullable: true })
  _max?: DepartmentMaxAggregateInput;
}
