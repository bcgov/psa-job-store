import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionUncheckedCreateNestedManyWithoutOrganizationInput } from '../position/position-unchecked-create-nested-many-without-organization.input';
import { EmployeeUncheckedCreateNestedManyWithoutOrganizationInput } from '../employee/employee-unchecked-create-nested-many-without-organization.input';

@InputType()
export class OrganizationUncheckedCreateWithoutDepartmentsInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => PositionUncheckedCreateNestedManyWithoutOrganizationInput, { nullable: true })
  positions?: PositionUncheckedCreateNestedManyWithoutOrganizationInput;

  @Field(() => EmployeeUncheckedCreateNestedManyWithoutOrganizationInput, { nullable: true })
  employees?: EmployeeUncheckedCreateNestedManyWithoutOrganizationInput;
}
