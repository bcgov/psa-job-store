import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { EmployeeGroupWhereInput } from './employee-group-where.input';
import { Type } from 'class-transformer';
import { EmployeeGroupOrderByWithRelationAndSearchRelevanceInput } from './employee-group-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';
import { Int } from '@nestjs/graphql';
import { EmployeeGroupScalarFieldEnum } from './employee-group-scalar-field.enum';

@ArgsType()
export class FindFirstEmployeeGroupArgs {
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

  @Field(() => [EmployeeGroupScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof EmployeeGroupScalarFieldEnum>;
}
