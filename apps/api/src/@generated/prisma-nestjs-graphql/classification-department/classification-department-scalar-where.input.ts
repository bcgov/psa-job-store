import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class ClassificationDepartmentScalarWhereInput {
  @Field(() => [ClassificationDepartmentScalarWhereInput], { nullable: true })
  AND?: Array<ClassificationDepartmentScalarWhereInput>;

  @Field(() => [ClassificationDepartmentScalarWhereInput], { nullable: true })
  OR?: Array<ClassificationDepartmentScalarWhereInput>;

  @Field(() => [ClassificationDepartmentScalarWhereInput], { nullable: true })
  NOT?: Array<ClassificationDepartmentScalarWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  department_id?: StringFilter;
}
