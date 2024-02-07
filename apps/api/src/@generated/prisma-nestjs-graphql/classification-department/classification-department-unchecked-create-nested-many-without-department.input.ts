import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationDepartmentCreateWithoutDepartmentInput } from './classification-department-create-without-department.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentCreateOrConnectWithoutDepartmentInput } from './classification-department-create-or-connect-without-department.input';
import { ClassificationDepartmentCreateManyDepartmentInputEnvelope } from './classification-department-create-many-department-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ClassificationDepartmentWhereUniqueInput } from './classification-department-where-unique.input';

@InputType()
export class ClassificationDepartmentUncheckedCreateNestedManyWithoutDepartmentInput {
  @Field(() => [ClassificationDepartmentCreateWithoutDepartmentInput], { nullable: true })
  @Type(() => ClassificationDepartmentCreateWithoutDepartmentInput)
  create?: Array<ClassificationDepartmentCreateWithoutDepartmentInput>;

  @Field(() => [ClassificationDepartmentCreateOrConnectWithoutDepartmentInput], { nullable: true })
  @Type(() => ClassificationDepartmentCreateOrConnectWithoutDepartmentInput)
  connectOrCreate?: Array<ClassificationDepartmentCreateOrConnectWithoutDepartmentInput>;

  @Field(() => ClassificationDepartmentCreateManyDepartmentInputEnvelope, { nullable: true })
  @Type(() => ClassificationDepartmentCreateManyDepartmentInputEnvelope)
  createMany?: ClassificationDepartmentCreateManyDepartmentInputEnvelope;

  @Field(() => [ClassificationDepartmentWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationDepartmentWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>>;
}
