import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationDepartmentScalarWhereInput } from './classification-department-scalar-where.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentUncheckedUpdateManyWithoutDepartmentInput } from './classification-department-unchecked-update-many-without-department.input';

@InputType()
export class ClassificationDepartmentUpdateManyWithWhereWithoutDepartmentInput {
  @Field(() => ClassificationDepartmentScalarWhereInput, { nullable: false })
  @Type(() => ClassificationDepartmentScalarWhereInput)
  where!: ClassificationDepartmentScalarWhereInput;

  @Field(() => ClassificationDepartmentUncheckedUpdateManyWithoutDepartmentInput, { nullable: false })
  @Type(() => ClassificationDepartmentUncheckedUpdateManyWithoutDepartmentInput)
  data!: ClassificationDepartmentUncheckedUpdateManyWithoutDepartmentInput;
}
