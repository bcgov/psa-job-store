import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateNestedOneWithoutDepartmentsInput } from '../classification/classification-create-nested-one-without-departments.input';

@InputType()
export class ClassificationDepartmentCreateWithoutDepartmentInput {
  @Field(() => ClassificationCreateNestedOneWithoutDepartmentsInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutDepartmentsInput;
}
