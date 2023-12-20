import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutEmployeesInput } from './classification-create-without-employees.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutEmployeesInput } from './classification-create-or-connect-without-employees.input';
import { ClassificationUpsertWithoutEmployeesInput } from './classification-upsert-without-employees.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { ClassificationUpdateToOneWithWhereWithoutEmployeesInput } from './classification-update-to-one-with-where-without-employees.input';

@InputType()
export class ClassificationUpdateOneRequiredWithoutEmployeesNestedInput {
  @Field(() => ClassificationCreateWithoutEmployeesInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutEmployeesInput)
  create?: ClassificationCreateWithoutEmployeesInput;

  @Field(() => ClassificationCreateOrConnectWithoutEmployeesInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutEmployeesInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutEmployeesInput;

  @Field(() => ClassificationUpsertWithoutEmployeesInput, { nullable: true })
  @Type(() => ClassificationUpsertWithoutEmployeesInput)
  upsert?: ClassificationUpsertWithoutEmployeesInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationUpdateToOneWithWhereWithoutEmployeesInput, { nullable: true })
  @Type(() => ClassificationUpdateToOneWithWhereWithoutEmployeesInput)
  update?: ClassificationUpdateToOneWithWhereWithoutEmployeesInput;
}
