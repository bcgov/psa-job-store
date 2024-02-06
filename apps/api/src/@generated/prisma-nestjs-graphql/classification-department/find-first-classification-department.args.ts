import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationDepartmentWhereInput } from './classification-department-where.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentOrderByWithRelationAndSearchRelevanceInput } from './classification-department-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { ClassificationDepartmentWhereUniqueInput } from './classification-department-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ClassificationDepartmentScalarFieldEnum } from './classification-department-scalar-field.enum';

@ArgsType()
export class FindFirstClassificationDepartmentArgs {
  @Field(() => ClassificationDepartmentWhereInput, { nullable: true })
  @Type(() => ClassificationDepartmentWhereInput)
  where?: ClassificationDepartmentWhereInput;

  @Field(() => [ClassificationDepartmentOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<ClassificationDepartmentOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => ClassificationDepartmentWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ClassificationDepartmentScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof ClassificationDepartmentScalarFieldEnum>;
}
