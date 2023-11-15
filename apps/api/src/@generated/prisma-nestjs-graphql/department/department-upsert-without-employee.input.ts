import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUpdateWithoutEmployeeInput } from './department-update-without-employee.input';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutEmployeeInput } from './department-create-without-employee.input';
import { DepartmentWhereInput } from './department-where.input';

@InputType()
export class DepartmentUpsertWithoutEmployeeInput {
  @Field(() => DepartmentUpdateWithoutEmployeeInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutEmployeeInput)
  update!: DepartmentUpdateWithoutEmployeeInput;

  @Field(() => DepartmentCreateWithoutEmployeeInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutEmployeeInput)
  create!: DepartmentCreateWithoutEmployeeInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;
}
