import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { EmployeeWhereInput } from './employee-where.input';
import { Type } from 'class-transformer';
import { EmployeeOrderByWithRelationAndSearchRelevanceInput } from './employee-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { Int } from '@nestjs/graphql';
import { EmployeeCountAggregateInput } from './employee-count-aggregate.input';
import { EmployeeMinAggregateInput } from './employee-min-aggregate.input';
import { EmployeeMaxAggregateInput } from './employee-max-aggregate.input';

@ArgsType()
export class EmployeeAggregateArgs {
  @Field(() => EmployeeWhereInput, { nullable: true })
  @Type(() => EmployeeWhereInput)
  where?: EmployeeWhereInput;

  @Field(() => [EmployeeOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<EmployeeOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => EmployeeWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => EmployeeCountAggregateInput, { nullable: true })
  _count?: EmployeeCountAggregateInput;

  @Field(() => EmployeeMinAggregateInput, { nullable: true })
  _min?: EmployeeMinAggregateInput;

  @Field(() => EmployeeMaxAggregateInput, { nullable: true })
  _max?: EmployeeMaxAggregateInput;
}
