import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateNestedManyWithoutOrganizationInput } from '../position/position-create-nested-many-without-organization.input';
import { EmployeeCreateNestedManyWithoutOrganizationInput } from '../employee/employee-create-nested-many-without-organization.input';

@InputType()
export class OrganizationCreateWithoutDepartmentsInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => PositionCreateNestedManyWithoutOrganizationInput, { nullable: true })
  positions?: PositionCreateNestedManyWithoutOrganizationInput;

  @Field(() => EmployeeCreateNestedManyWithoutOrganizationInput, { nullable: true })
  employees?: EmployeeCreateNestedManyWithoutOrganizationInput;
}
