import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { EmployeeWhereInput } from './employee-where.input';
import { Type } from 'class-transformer';
import { EmployeeOrderByWithRelationAndSearchRelevanceInput } from './employee-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { HideField } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { EmployeeScalarFieldEnum } from './employee-scalar-field.enum';

@ArgsType()
export class FindManyEmployeeArgs {
  @Field(() => EmployeeWhereInput, { nullable: true })
  @Type(() => EmployeeWhereInput)
  where?: EmployeeWhereInput;

  @Field(() => [EmployeeOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<EmployeeOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof EmployeeScalarFieldEnum>;
}
