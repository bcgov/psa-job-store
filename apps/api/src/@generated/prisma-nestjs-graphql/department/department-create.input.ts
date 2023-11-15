import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateNestedOneWithoutDepartmentsInput } from '../organization/organization-create-nested-one-without-departments.input';
import { PositionCreateNestedManyWithoutDepartmentInput } from '../position/position-create-nested-many-without-department.input';
import { EmployeeCreateNestedManyWithoutDepartmentInput } from '../employee/employee-create-nested-many-without-department.input';

@InputType()
export class DepartmentCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => OrganizationCreateNestedOneWithoutDepartmentsInput, { nullable: false })
  organization!: OrganizationCreateNestedOneWithoutDepartmentsInput;

  @Field(() => PositionCreateNestedManyWithoutDepartmentInput, { nullable: true })
  Position?: PositionCreateNestedManyWithoutDepartmentInput;

  @Field(() => EmployeeCreateNestedManyWithoutDepartmentInput, { nullable: true })
  Employee?: EmployeeCreateNestedManyWithoutDepartmentInput;
}
