import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeStatus } from '../prisma/employee-status.enum';
import { DepartmentCreateNestedOneWithoutEmployeeInput } from '../department/department-create-nested-one-without-employee.input';
import { OrganizationCreateNestedOneWithoutEmployeeInput } from '../organization/organization-create-nested-one-without-employee.input';
import { PositionEmployeeCreateNestedManyWithoutEmployeeInput } from '../position-employee/position-employee-create-nested-many-without-employee.input';

@InputType()
export class EmployeeCreateWithoutClassificationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => EmployeeStatus, { nullable: true })
  status?: keyof typeof EmployeeStatus;

  @Field(() => DepartmentCreateNestedOneWithoutEmployeeInput, { nullable: false })
  department!: DepartmentCreateNestedOneWithoutEmployeeInput;

  @Field(() => OrganizationCreateNestedOneWithoutEmployeeInput, { nullable: false })
  organization!: OrganizationCreateNestedOneWithoutEmployeeInput;

  @Field(() => PositionEmployeeCreateNestedManyWithoutEmployeeInput, { nullable: true })
  PositionEmployee?: PositionEmployeeCreateNestedManyWithoutEmployeeInput;
}
