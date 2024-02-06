import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationDepartmentCreateWithoutDepartmentInput } from './classification-department-create-without-department.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentCreateOrConnectWithoutDepartmentInput } from './classification-department-create-or-connect-without-department.input';
import { ClassificationDepartmentUpsertWithWhereUniqueWithoutDepartmentInput } from './classification-department-upsert-with-where-unique-without-department.input';
import { ClassificationDepartmentCreateManyDepartmentInputEnvelope } from './classification-department-create-many-department-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ClassificationDepartmentWhereUniqueInput } from './classification-department-where-unique.input';
import { ClassificationDepartmentUpdateWithWhereUniqueWithoutDepartmentInput } from './classification-department-update-with-where-unique-without-department.input';
import { ClassificationDepartmentUpdateManyWithWhereWithoutDepartmentInput } from './classification-department-update-many-with-where-without-department.input';
import { ClassificationDepartmentScalarWhereInput } from './classification-department-scalar-where.input';

@InputType()
export class ClassificationDepartmentUncheckedUpdateManyWithoutDepartmentNestedInput {
  @Field(() => [ClassificationDepartmentCreateWithoutDepartmentInput], { nullable: true })
  @Type(() => ClassificationDepartmentCreateWithoutDepartmentInput)
  create?: Array<ClassificationDepartmentCreateWithoutDepartmentInput>;

  @Field(() => [ClassificationDepartmentCreateOrConnectWithoutDepartmentInput], { nullable: true })
  @Type(() => ClassificationDepartmentCreateOrConnectWithoutDepartmentInput)
  connectOrCreate?: Array<ClassificationDepartmentCreateOrConnectWithoutDepartmentInput>;

  @Field(() => [ClassificationDepartmentUpsertWithWhereUniqueWithoutDepartmentInput], { nullable: true })
  @Type(() => ClassificationDepartmentUpsertWithWhereUniqueWithoutDepartmentInput)
  upsert?: Array<ClassificationDepartmentUpsertWithWhereUniqueWithoutDepartmentInput>;

  @Field(() => ClassificationDepartmentCreateManyDepartmentInputEnvelope, { nullable: true })
  @Type(() => ClassificationDepartmentCreateManyDepartmentInputEnvelope)
  createMany?: ClassificationDepartmentCreateManyDepartmentInputEnvelope;

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

  @Field(() => [ClassificationDepartmentUpdateWithWhereUniqueWithoutDepartmentInput], { nullable: true })
  @Type(() => ClassificationDepartmentUpdateWithWhereUniqueWithoutDepartmentInput)
  update?: Array<ClassificationDepartmentUpdateWithWhereUniqueWithoutDepartmentInput>;

  @Field(() => [ClassificationDepartmentUpdateManyWithWhereWithoutDepartmentInput], { nullable: true })
  @Type(() => ClassificationDepartmentUpdateManyWithWhereWithoutDepartmentInput)
  updateMany?: Array<ClassificationDepartmentUpdateManyWithWhereWithoutDepartmentInput>;

  @Field(() => [ClassificationDepartmentScalarWhereInput], { nullable: true })
  @Type(() => ClassificationDepartmentScalarWhereInput)
  deleteMany?: Array<ClassificationDepartmentScalarWhereInput>;
}
