import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutEmployeeInput } from './department-create-without-employee.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutEmployeeInput } from './department-create-or-connect-without-employee.input';
import { DepartmentUpsertWithoutEmployeeInput } from './department-upsert-without-employee.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { DepartmentUpdateToOneWithWhereWithoutEmployeeInput } from './department-update-to-one-with-where-without-employee.input';

@InputType()
export class DepartmentUpdateOneRequiredWithoutEmployeeNestedInput {
  @Field(() => DepartmentCreateWithoutEmployeeInput, { nullable: true })
  @Type(() => DepartmentCreateWithoutEmployeeInput)
  create?: DepartmentCreateWithoutEmployeeInput;

  @Field(() => DepartmentCreateOrConnectWithoutEmployeeInput, { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutEmployeeInput)
  connectOrCreate?: DepartmentCreateOrConnectWithoutEmployeeInput;

  @Field(() => DepartmentUpsertWithoutEmployeeInput, { nullable: true })
  @Type(() => DepartmentUpsertWithoutEmployeeInput)
  upsert?: DepartmentUpsertWithoutEmployeeInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentUpdateToOneWithWhereWithoutEmployeeInput, { nullable: true })
  @Type(() => DepartmentUpdateToOneWithWhereWithoutEmployeeInput)
  update?: DepartmentUpdateToOneWithWhereWithoutEmployeeInput;
}
