import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationDepartmentCreateWithoutClassificationInput } from './classification-department-create-without-classification.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentCreateOrConnectWithoutClassificationInput } from './classification-department-create-or-connect-without-classification.input';
import { ClassificationDepartmentUpsertWithWhereUniqueWithoutClassificationInput } from './classification-department-upsert-with-where-unique-without-classification.input';
import { ClassificationDepartmentCreateManyClassificationInputEnvelope } from './classification-department-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ClassificationDepartmentWhereUniqueInput } from './classification-department-where-unique.input';
import { ClassificationDepartmentUpdateWithWhereUniqueWithoutClassificationInput } from './classification-department-update-with-where-unique-without-classification.input';
import { ClassificationDepartmentUpdateManyWithWhereWithoutClassificationInput } from './classification-department-update-many-with-where-without-classification.input';
import { ClassificationDepartmentScalarWhereInput } from './classification-department-scalar-where.input';

@InputType()
export class ClassificationDepartmentUncheckedUpdateManyWithoutClassificationNestedInput {
  @Field(() => [ClassificationDepartmentCreateWithoutClassificationInput], { nullable: true })
  @Type(() => ClassificationDepartmentCreateWithoutClassificationInput)
  create?: Array<ClassificationDepartmentCreateWithoutClassificationInput>;

  @Field(() => [ClassificationDepartmentCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => ClassificationDepartmentCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<ClassificationDepartmentCreateOrConnectWithoutClassificationInput>;

  @Field(() => [ClassificationDepartmentUpsertWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => ClassificationDepartmentUpsertWithWhereUniqueWithoutClassificationInput)
  upsert?: Array<ClassificationDepartmentUpsertWithWhereUniqueWithoutClassificationInput>;

  @Field(() => ClassificationDepartmentCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => ClassificationDepartmentCreateManyClassificationInputEnvelope)
  createMany?: ClassificationDepartmentCreateManyClassificationInputEnvelope;

  @Field(() => [ClassificationDepartmentWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationDepartmentWhereUniqueInput)
  set?: Array<Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>>;

  @Field(() => [ClassificationDepartmentWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationDepartmentWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>>;

  @Field(() => [ClassificationDepartmentWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationDepartmentWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>>;

  @Field(() => [ClassificationDepartmentWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationDepartmentWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>>;

  @Field(() => [ClassificationDepartmentUpdateWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => ClassificationDepartmentUpdateWithWhereUniqueWithoutClassificationInput)
  update?: Array<ClassificationDepartmentUpdateWithWhereUniqueWithoutClassificationInput>;

  @Field(() => [ClassificationDepartmentUpdateManyWithWhereWithoutClassificationInput], { nullable: true })
  @Type(() => ClassificationDepartmentUpdateManyWithWhereWithoutClassificationInput)
  updateMany?: Array<ClassificationDepartmentUpdateManyWithWhereWithoutClassificationInput>;

  @Field(() => [ClassificationDepartmentScalarWhereInput], { nullable: true })
  @Type(() => ClassificationDepartmentScalarWhereInput)
  deleteMany?: Array<ClassificationDepartmentScalarWhereInput>;
}
