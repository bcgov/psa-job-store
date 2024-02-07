import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationDepartmentClassification_idDepartment_idCompoundUniqueInput } from './classification-department-classification-id-department-id-compound-unique.input';
import { ClassificationDepartmentWhereInput } from './classification-department-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { ClassificationRelationFilter } from '../classification/classification-relation-filter.input';
import { DepartmentRelationFilter } from '../department/department-relation-filter.input';

@InputType()
export class ClassificationDepartmentWhereUniqueInput {
  @Field(() => ClassificationDepartmentClassification_idDepartment_idCompoundUniqueInput, { nullable: true })
  classification_id_department_id?: ClassificationDepartmentClassification_idDepartment_idCompoundUniqueInput;

  @Field(() => [ClassificationDepartmentWhereInput], { nullable: true })
  AND?: Array<ClassificationDepartmentWhereInput>;

  @Field(() => [ClassificationDepartmentWhereInput], { nullable: true })
  OR?: Array<ClassificationDepartmentWhereInput>;

  @Field(() => [ClassificationDepartmentWhereInput], { nullable: true })
  NOT?: Array<ClassificationDepartmentWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  department_id?: StringFilter;

  @Field(() => ClassificationRelationFilter, { nullable: true })
  classification?: ClassificationRelationFilter;

  @Field(() => DepartmentRelationFilter, { nullable: true })
  department?: DepartmentRelationFilter;
}
