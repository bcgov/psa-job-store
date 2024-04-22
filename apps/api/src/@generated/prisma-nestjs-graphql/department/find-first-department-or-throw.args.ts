import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { DepartmentOrderByWithRelationAndSearchRelevanceInput } from './department-order-by-with-relation-and-search-relevance.input';
import { DepartmentScalarFieldEnum } from './department-scalar-field.enum';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { DepartmentWhereInput } from './department-where.input';

@ArgsType()
export class FindFirstDepartmentOrThrowArgs {
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

  @Field(() => [DepartmentScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof DepartmentScalarFieldEnum>;
}
