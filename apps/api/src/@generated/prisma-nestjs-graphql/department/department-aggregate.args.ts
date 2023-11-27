import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DepartmentWhereInput } from './department-where.input';
import { Type } from 'class-transformer';
import { DepartmentOrderByWithRelationAndSearchRelevanceInput } from './department-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { Int } from '@nestjs/graphql';
import { DepartmentCountAggregateInput } from './department-count-aggregate.input';
import { DepartmentMinAggregateInput } from './department-min-aggregate.input';
import { DepartmentMaxAggregateInput } from './department-max-aggregate.input';

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
