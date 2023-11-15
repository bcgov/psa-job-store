import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeStatus } from '../prisma/employee-status.enum';
import { ClassificationCreateNestedOneWithoutEmployeeInput } from '../classification/classification-create-nested-one-without-employee.input';
import { DepartmentCreateNestedOneWithoutEmployeeInput } from '../department/department-create-nested-one-without-employee.input';
import { OrganizationCreateNestedOneWithoutEmployeeInput } from '../organization/organization-create-nested-one-without-employee.input';
import { PositionEmployeeCreateNestedManyWithoutEmployeeInput } from '../position-employee/position-employee-create-nested-many-without-employee.input';

@InputType()
export class EmployeeCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => EmployeeStatus, { nullable: true })
  status?: keyof typeof EmployeeStatus;

  @Field(() => ClassificationCreateNestedOneWithoutEmployeeInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutEmployeeInput;

  @Field(() => DepartmentCreateNestedOneWithoutEmployeeInput, { nullable: false })
  department!: DepartmentCreateNestedOneWithoutEmployeeInput;

  @Field(() => OrganizationCreateNestedOneWithoutEmployeeInput, { nullable: false })
  organization!: OrganizationCreateNestedOneWithoutEmployeeInput;

  @Field(() => PositionEmployeeCreateNestedManyWithoutEmployeeInput, { nullable: true })
  PositionEmployee?: PositionEmployeeCreateNestedManyWithoutEmployeeInput;
}
