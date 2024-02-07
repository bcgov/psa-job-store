import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationDepartmentCreateWithoutClassificationInput } from './classification-department-create-without-classification.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentCreateOrConnectWithoutClassificationInput } from './classification-department-create-or-connect-without-classification.input';
import { ClassificationDepartmentCreateManyClassificationInputEnvelope } from './classification-department-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ClassificationDepartmentWhereUniqueInput } from './classification-department-where-unique.input';

@InputType()
export class ClassificationDepartmentUncheckedCreateNestedManyWithoutClassificationInput {
  @Field(() => [ClassificationDepartmentCreateWithoutClassificationInput], { nullable: true })
  @Type(() => ClassificationDepartmentCreateWithoutClassificationInput)
  create?: Array<ClassificationDepartmentCreateWithoutClassificationInput>;

  @Field(() => [ClassificationDepartmentCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => ClassificationDepartmentCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<ClassificationDepartmentCreateOrConnectWithoutClassificationInput>;

  @Field(() => ClassificationDepartmentCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => ClassificationDepartmentCreateManyClassificationInputEnvelope)
  createMany?: ClassificationDepartmentCreateManyClassificationInputEnvelope;

  @Field(() => [ClassificationDepartmentWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationDepartmentWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>>;
}
