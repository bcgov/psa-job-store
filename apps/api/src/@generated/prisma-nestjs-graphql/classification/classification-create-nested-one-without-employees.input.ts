import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutEmployeesInput } from './classification-create-without-employees.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutEmployeesInput } from './classification-create-or-connect-without-employees.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateNestedOneWithoutEmployeesInput {
  @Field(() => ClassificationCreateWithoutEmployeesInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutEmployeesInput)
  create?: ClassificationCreateWithoutEmployeesInput;

  @Field(() => ClassificationCreateOrConnectWithoutEmployeesInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutEmployeesInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutEmployeesInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;
}
