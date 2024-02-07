import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationDepartmentScalarWhereInput } from './classification-department-scalar-where.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentUncheckedUpdateManyWithoutClassificationInput } from './classification-department-unchecked-update-many-without-classification.input';

@InputType()
export class ClassificationDepartmentUpdateManyWithWhereWithoutClassificationInput {
  @Field(() => ClassificationDepartmentScalarWhereInput, { nullable: false })
  @Type(() => ClassificationDepartmentScalarWhereInput)
  where!: ClassificationDepartmentScalarWhereInput;

  @Field(() => ClassificationDepartmentUncheckedUpdateManyWithoutClassificationInput, { nullable: false })
  @Type(() => ClassificationDepartmentUncheckedUpdateManyWithoutClassificationInput)
  data!: ClassificationDepartmentUncheckedUpdateManyWithoutClassificationInput;
}
