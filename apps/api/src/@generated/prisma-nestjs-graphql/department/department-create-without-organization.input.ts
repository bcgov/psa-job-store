import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateNestedManyWithoutDepartmentInput } from '../position/position-create-nested-many-without-department.input';
import { EmployeeCreateNestedManyWithoutDepartmentInput } from '../employee/employee-create-nested-many-without-department.input';

@InputType()
export class DepartmentCreateWithoutOrganizationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => PositionCreateNestedManyWithoutDepartmentInput, { nullable: true })
  positions?: PositionCreateNestedManyWithoutDepartmentInput;

  @Field(() => EmployeeCreateNestedManyWithoutDepartmentInput, { nullable: true })
  employees?: EmployeeCreateNestedManyWithoutDepartmentInput;
}
