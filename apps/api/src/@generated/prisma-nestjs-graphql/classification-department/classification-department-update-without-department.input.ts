import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateOneRequiredWithoutDepartmentsNestedInput } from '../classification/classification-update-one-required-without-departments-nested.input';

@InputType()
export class ClassificationDepartmentUpdateWithoutDepartmentInput {
  @Field(() => ClassificationUpdateOneRequiredWithoutDepartmentsNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutDepartmentsNestedInput;
}
