import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateNestedOneWithoutClassificationsInput } from '../department/department-create-nested-one-without-classifications.input';

@InputType()
export class ClassificationDepartmentCreateWithoutClassificationInput {
  @Field(() => DepartmentCreateNestedOneWithoutClassificationsInput, { nullable: false })
  department!: DepartmentCreateNestedOneWithoutClassificationsInput;
}
