import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutEmployeesInput } from './classification-create-without-employees.input';

@InputType()
export class ClassificationCreateOrConnectWithoutEmployeesInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutEmployeesInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutEmployeesInput)
  create!: ClassificationCreateWithoutEmployeesInput;
}
