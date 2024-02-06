import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateOneRequiredWithoutDepartmentsNestedInput } from '../classification/classification-update-one-required-without-departments-nested.input';
import { DepartmentUpdateOneRequiredWithoutClassificationsNestedInput } from '../department/department-update-one-required-without-classifications-nested.input';

@InputType()
export class ClassificationDepartmentUpdateInput {
  @Field(() => ClassificationUpdateOneRequiredWithoutDepartmentsNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutDepartmentsNestedInput;

  @Field(() => DepartmentUpdateOneRequiredWithoutClassificationsNestedInput, { nullable: true })
  department?: DepartmentUpdateOneRequiredWithoutClassificationsNestedInput;
}
