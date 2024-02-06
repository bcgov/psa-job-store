import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationDepartmentWhereUniqueInput } from './classification-department-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentUpdateWithoutDepartmentInput } from './classification-department-update-without-department.input';

@InputType()
export class ClassificationDepartmentUpdateWithWhereUniqueWithoutDepartmentInput {
  @Field(() => ClassificationDepartmentWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationDepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>;

  @Field(() => ClassificationDepartmentUpdateWithoutDepartmentInput, { nullable: false })
  @Type(() => ClassificationDepartmentUpdateWithoutDepartmentInput)
  data!: ClassificationDepartmentUpdateWithoutDepartmentInput;
}
