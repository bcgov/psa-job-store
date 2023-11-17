import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUpdateWithoutEmployeesInput } from './department-update-without-employees.input';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutEmployeesInput } from './department-create-without-employees.input';
import { DepartmentWhereInput } from './department-where.input';

@InputType()
export class DepartmentUpsertWithoutEmployeesInput {
  @Field(() => DepartmentUpdateWithoutEmployeesInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutEmployeesInput)
  update!: DepartmentUpdateWithoutEmployeesInput;

  @Field(() => DepartmentCreateWithoutEmployeesInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutEmployeesInput)
  create!: DepartmentCreateWithoutEmployeesInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;
}
