import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateNestedOneWithoutDepartmentsInput } from '../organization/organization-create-nested-one-without-departments.input';
import { EmployeeCreateNestedManyWithoutDepartmentInput } from '../employee/employee-create-nested-many-without-department.input';

@InputType()
export class DepartmentCreateWithoutPositionsInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => OrganizationCreateNestedOneWithoutDepartmentsInput, { nullable: false })
  organization!: OrganizationCreateNestedOneWithoutDepartmentsInput;

  @Field(() => EmployeeCreateNestedManyWithoutDepartmentInput, { nullable: true })
  employees?: EmployeeCreateNestedManyWithoutDepartmentInput;
}
