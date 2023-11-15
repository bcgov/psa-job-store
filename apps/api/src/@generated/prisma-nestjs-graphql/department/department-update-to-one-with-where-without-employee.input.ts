import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentWhereInput } from './department-where.input';
import { Type } from 'class-transformer';
import { DepartmentUpdateWithoutEmployeeInput } from './department-update-without-employee.input';

@InputType()
export class DepartmentUpdateToOneWithWhereWithoutEmployeeInput {
  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;

  @Field(() => DepartmentUpdateWithoutEmployeeInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutEmployeeInput)
  data!: DepartmentUpdateWithoutEmployeeInput;
}
