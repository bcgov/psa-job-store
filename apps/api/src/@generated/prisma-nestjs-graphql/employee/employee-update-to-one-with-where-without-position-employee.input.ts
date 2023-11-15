import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeWhereInput } from './employee-where.input';
import { Type } from 'class-transformer';
import { EmployeeUpdateWithoutPositionEmployeeInput } from './employee-update-without-position-employee.input';

@InputType()
export class EmployeeUpdateToOneWithWhereWithoutPositionEmployeeInput {
  @Field(() => EmployeeWhereInput, { nullable: true })
  @Type(() => EmployeeWhereInput)
  where?: EmployeeWhereInput;

  @Field(() => EmployeeUpdateWithoutPositionEmployeeInput, { nullable: false })
  @Type(() => EmployeeUpdateWithoutPositionEmployeeInput)
  data!: EmployeeUpdateWithoutPositionEmployeeInput;
}
