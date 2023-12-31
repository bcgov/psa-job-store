import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateNestedManyWithoutOrganizationInput } from '../department/department-create-nested-many-without-organization.input';
import { PositionCreateNestedManyWithoutOrganizationInput } from '../position/position-create-nested-many-without-organization.input';
import { EmployeeCreateNestedManyWithoutOrganizationInput } from '../employee/employee-create-nested-many-without-organization.input';

@InputType()
export class OrganizationCreateWithoutJob_provilesInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => DepartmentCreateNestedManyWithoutOrganizationInput, { nullable: true })
  departments?: DepartmentCreateNestedManyWithoutOrganizationInput;

  @Field(() => PositionCreateNestedManyWithoutOrganizationInput, { nullable: true })
  positions?: PositionCreateNestedManyWithoutOrganizationInput;

  @Field(() => EmployeeCreateNestedManyWithoutOrganizationInput, { nullable: true })
  employees?: EmployeeCreateNestedManyWithoutOrganizationInput;
}
