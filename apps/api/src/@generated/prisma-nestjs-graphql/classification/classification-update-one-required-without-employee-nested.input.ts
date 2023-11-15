import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutEmployeeInput } from './classification-create-without-employee.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutEmployeeInput } from './classification-create-or-connect-without-employee.input';
import { ClassificationUpsertWithoutEmployeeInput } from './classification-upsert-without-employee.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { ClassificationUpdateToOneWithWhereWithoutEmployeeInput } from './classification-update-to-one-with-where-without-employee.input';

@InputType()
export class ClassificationUpdateOneRequiredWithoutEmployeeNestedInput {
  @Field(() => ClassificationCreateWithoutEmployeeInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutEmployeeInput)
  create?: ClassificationCreateWithoutEmployeeInput;

  @Field(() => ClassificationCreateOrConnectWithoutEmployeeInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutEmployeeInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutEmployeeInput;

  @Field(() => ClassificationUpsertWithoutEmployeeInput, { nullable: true })
  @Type(() => ClassificationUpsertWithoutEmployeeInput)
  upsert?: ClassificationUpsertWithoutEmployeeInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationUpdateToOneWithWhereWithoutEmployeeInput, { nullable: true })
  @Type(() => ClassificationUpdateToOneWithWhereWithoutEmployeeInput)
  update?: ClassificationUpdateToOneWithWhereWithoutEmployeeInput;
}
