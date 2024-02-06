import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateNestedOneWithoutDepartmentsInput } from '../classification/classification-create-nested-one-without-departments.input';
import { DepartmentCreateNestedOneWithoutClassificationsInput } from '../department/department-create-nested-one-without-classifications.input';

@InputType()
export class ClassificationDepartmentCreateInput {
  @Field(() => ClassificationCreateNestedOneWithoutDepartmentsInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutDepartmentsInput;

  @Field(() => DepartmentCreateNestedOneWithoutClassificationsInput, { nullable: false })
  department!: DepartmentCreateNestedOneWithoutClassificationsInput;
}
