import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeUpdateWithoutPositionEmployeeInput } from './employee-update-without-position-employee.input';
import { Type } from 'class-transformer';
import { EmployeeCreateWithoutPositionEmployeeInput } from './employee-create-without-position-employee.input';
import { EmployeeWhereInput } from './employee-where.input';

@InputType()
export class EmployeeUpsertWithoutPositionEmployeeInput {
  @Field(() => EmployeeUpdateWithoutPositionEmployeeInput, { nullable: false })
  @Type(() => EmployeeUpdateWithoutPositionEmployeeInput)
  update!: EmployeeUpdateWithoutPositionEmployeeInput;

  @Field(() => EmployeeCreateWithoutPositionEmployeeInput, { nullable: false })
  @Type(() => EmployeeCreateWithoutPositionEmployeeInput)
  create!: EmployeeCreateWithoutPositionEmployeeInput;

  @Field(() => EmployeeWhereInput, { nullable: true })
  @Type(() => EmployeeWhereInput)
  where?: EmployeeWhereInput;
}
