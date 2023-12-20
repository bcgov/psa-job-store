import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeStatus } from '../prisma/employee-status.enum';
import { ClassificationCreateNestedOneWithoutEmployeesInput } from '../classification/classification-create-nested-one-without-employees.input';
import { DepartmentCreateNestedOneWithoutEmployeesInput } from '../department/department-create-nested-one-without-employees.input';
import { PositionEmployeeCreateNestedManyWithoutEmployeeInput } from '../position-employee/position-employee-create-nested-many-without-employee.input';

@InputType()
export class EmployeeCreateWithoutOrganizationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => EmployeeStatus, { nullable: true })
  status?: keyof typeof EmployeeStatus;

  @Field(() => ClassificationCreateNestedOneWithoutEmployeesInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutEmployeesInput;

  @Field(() => DepartmentCreateNestedOneWithoutEmployeesInput, { nullable: false })
  department!: DepartmentCreateNestedOneWithoutEmployeesInput;

  @Field(() => PositionEmployeeCreateNestedManyWithoutEmployeeInput, { nullable: true })
  positions?: PositionEmployeeCreateNestedManyWithoutEmployeeInput;
}
