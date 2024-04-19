import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { EmployeeGroupOrderByWithRelationAndSearchRelevanceInput } from './employee-group-order-by-with-relation-and-search-relevance.input';
import { EmployeeGroupScalarFieldEnum } from './employee-group-scalar-field.enum';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';
import { EmployeeGroupWhereInput } from './employee-group-where.input';

@ArgsType()
export class FindFirstEmployeeGroupOrThrowArgs {
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
