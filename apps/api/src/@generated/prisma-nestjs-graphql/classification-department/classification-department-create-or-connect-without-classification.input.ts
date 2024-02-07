import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationDepartmentWhereUniqueInput } from './classification-department-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentCreateWithoutClassificationInput } from './classification-department-create-without-classification.input';

@InputType()
export class ClassificationDepartmentCreateOrConnectWithoutClassificationInput {
  @Field(() => ClassificationDepartmentWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationDepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>;

  @Field(() => ClassificationDepartmentCreateWithoutClassificationInput, { nullable: false })
  @Type(() => ClassificationDepartmentCreateWithoutClassificationInput)
  create!: ClassificationDepartmentCreateWithoutClassificationInput;
}
