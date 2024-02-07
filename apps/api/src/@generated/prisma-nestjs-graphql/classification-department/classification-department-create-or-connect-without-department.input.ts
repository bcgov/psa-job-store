import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationDepartmentWhereUniqueInput } from './classification-department-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentCreateWithoutDepartmentInput } from './classification-department-create-without-department.input';

@InputType()
export class ClassificationDepartmentCreateOrConnectWithoutDepartmentInput {
  @Field(() => ClassificationDepartmentWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationDepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>;

  @Field(() => ClassificationDepartmentCreateWithoutDepartmentInput, { nullable: false })
  @Type(() => ClassificationDepartmentCreateWithoutDepartmentInput)
  create!: ClassificationDepartmentCreateWithoutDepartmentInput;
}
