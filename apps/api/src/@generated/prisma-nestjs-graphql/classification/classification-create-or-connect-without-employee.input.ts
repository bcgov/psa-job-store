import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutEmployeeInput } from './classification-create-without-employee.input';

@InputType()
export class ClassificationCreateOrConnectWithoutEmployeeInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutEmployeeInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutEmployeeInput)
  create!: ClassificationCreateWithoutEmployeeInput;
}
