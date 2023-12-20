import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentWhereInput } from './department-where.input';
import { Type } from 'class-transformer';
import { DepartmentUpdateWithoutEmployeesInput } from './department-update-without-employees.input';

@InputType()
export class DepartmentUpdateToOneWithWhereWithoutEmployeesInput {
  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;

  @Field(() => DepartmentUpdateWithoutEmployeesInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutEmployeesInput)
  data!: DepartmentUpdateWithoutEmployeesInput;
}
