import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutEmployeesInput } from './department-create-without-employees.input';

@InputType()
export class DepartmentCreateOrConnectWithoutEmployeesInput {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentCreateWithoutEmployeesInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutEmployeesInput)
  create!: DepartmentCreateWithoutEmployeesInput;
}
