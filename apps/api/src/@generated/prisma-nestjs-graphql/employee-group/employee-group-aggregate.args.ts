import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { EmployeeGroupWhereInput } from './employee-group-where.input';
import { Type } from 'class-transformer';
import { EmployeeGroupOrderByWithRelationAndSearchRelevanceInput } from './employee-group-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';
import { Int } from '@nestjs/graphql';
import { EmployeeGroupCountAggregateInput } from './employee-group-count-aggregate.input';
import { EmployeeGroupMinAggregateInput } from './employee-group-min-aggregate.input';
import { EmployeeGroupMaxAggregateInput } from './employee-group-max-aggregate.input';

@ArgsType()
export class EmployeeGroupAggregateArgs {
  @Field(() => EmployeeGroupWhereInput, { nullable: true })
  @Type(() => EmployeeGroupWhereInput)
  where?: EmployeeGroupWhereInput;

  @Field(() => [EmployeeGroupOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<EmployeeGroupOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => EmployeeGroupWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<EmployeeGroupWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => EmployeeGroupCountAggregateInput, { nullable: true })
  _count?: EmployeeGroupCountAggregateInput;

  @Field(() => EmployeeGroupMinAggregateInput, { nullable: true })
  _min?: EmployeeGroupMinAggregateInput;

  @Field(() => EmployeeGroupMaxAggregateInput, { nullable: true })
  _max?: EmployeeGroupMaxAggregateInput;
}
