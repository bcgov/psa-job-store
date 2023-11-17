import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutEmployeesInput } from './department-create-without-employees.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutEmployeesInput } from './department-create-or-connect-without-employees.input';
import { DepartmentUpsertWithoutEmployeesInput } from './department-upsert-without-employees.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { DepartmentUpdateToOneWithWhereWithoutEmployeesInput } from './department-update-to-one-with-where-without-employees.input';

@InputType()
export class DepartmentUpdateOneRequiredWithoutEmployeesNestedInput {
  @Field(() => DepartmentCreateWithoutEmployeesInput, { nullable: true })
  @Type(() => DepartmentCreateWithoutEmployeesInput)
  create?: DepartmentCreateWithoutEmployeesInput;

  @Field(() => DepartmentCreateOrConnectWithoutEmployeesInput, { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutEmployeesInput)
  connectOrCreate?: DepartmentCreateOrConnectWithoutEmployeesInput;

  @Field(() => DepartmentUpsertWithoutEmployeesInput, { nullable: true })
  @Type(() => DepartmentUpsertWithoutEmployeesInput)
  upsert?: DepartmentUpsertWithoutEmployeesInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentUpdateToOneWithWhereWithoutEmployeesInput, { nullable: true })
  @Type(() => DepartmentUpdateToOneWithWhereWithoutEmployeesInput)
  update?: DepartmentUpdateToOneWithWhereWithoutEmployeesInput;
}
