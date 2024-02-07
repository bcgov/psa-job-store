import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutDepartmentsInput } from './classification-create-without-departments.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutDepartmentsInput } from './classification-create-or-connect-without-departments.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateNestedOneWithoutDepartmentsInput {
  @Field(() => ClassificationCreateWithoutDepartmentsInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutDepartmentsInput)
  create?: ClassificationCreateWithoutDepartmentsInput;

  @Field(() => ClassificationCreateOrConnectWithoutDepartmentsInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutDepartmentsInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutDepartmentsInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;
}
