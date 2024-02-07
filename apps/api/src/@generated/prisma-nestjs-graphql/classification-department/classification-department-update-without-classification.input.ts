import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUpdateOneRequiredWithoutClassificationsNestedInput } from '../department/department-update-one-required-without-classifications-nested.input';

@InputType()
export class ClassificationDepartmentUpdateWithoutClassificationInput {
  @Field(() => DepartmentUpdateOneRequiredWithoutClassificationsNestedInput, { nullable: true })
  department?: DepartmentUpdateOneRequiredWithoutClassificationsNestedInput;
}
