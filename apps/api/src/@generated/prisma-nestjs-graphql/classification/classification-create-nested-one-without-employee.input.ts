import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutEmployeeInput } from './classification-create-without-employee.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutEmployeeInput } from './classification-create-or-connect-without-employee.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateNestedOneWithoutEmployeeInput {
  @Field(() => ClassificationCreateWithoutEmployeeInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutEmployeeInput)
  create?: ClassificationCreateWithoutEmployeeInput;

  @Field(() => ClassificationCreateOrConnectWithoutEmployeeInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutEmployeeInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutEmployeeInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;
}
