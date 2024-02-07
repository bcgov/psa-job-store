import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutDepartmentsInput } from './classification-create-without-departments.input';

@InputType()
export class ClassificationCreateOrConnectWithoutDepartmentsInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutDepartmentsInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutDepartmentsInput)
  create!: ClassificationCreateWithoutDepartmentsInput;
}
