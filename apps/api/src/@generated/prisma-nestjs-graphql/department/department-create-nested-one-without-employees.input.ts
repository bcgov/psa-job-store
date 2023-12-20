import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutEmployeesInput } from './department-create-without-employees.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutEmployeesInput } from './department-create-or-connect-without-employees.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentCreateNestedOneWithoutEmployeesInput {
  @Field(() => DepartmentCreateWithoutEmployeesInput, { nullable: true })
  @Type(() => DepartmentCreateWithoutEmployeesInput)
  create?: DepartmentCreateWithoutEmployeesInput;

  @Field(() => DepartmentCreateOrConnectWithoutEmployeesInput, { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutEmployeesInput)
  connectOrCreate?: DepartmentCreateOrConnectWithoutEmployeesInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;
}
