import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutEmployeeInput } from './department-create-without-employee.input';

@InputType()
export class DepartmentCreateOrConnectWithoutEmployeeInput {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentCreateWithoutEmployeeInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutEmployeeInput)
  create!: DepartmentCreateWithoutEmployeeInput;
}
