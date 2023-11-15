import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUncheckedCreateNestedManyWithoutOrganizationInput } from '../department/department-unchecked-create-nested-many-without-organization.input';
import { PositionUncheckedCreateNestedManyWithoutOrganizationInput } from '../position/position-unchecked-create-nested-many-without-organization.input';
import { EmployeeUncheckedCreateNestedManyWithoutOrganizationInput } from '../employee/employee-unchecked-create-nested-many-without-organization.input';

@InputType()
export class OrganizationUncheckedCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => DepartmentUncheckedCreateNestedManyWithoutOrganizationInput, { nullable: true })
  departments?: DepartmentUncheckedCreateNestedManyWithoutOrganizationInput;

  @Field(() => PositionUncheckedCreateNestedManyWithoutOrganizationInput, { nullable: true })
  Position?: PositionUncheckedCreateNestedManyWithoutOrganizationInput;

  @Field(() => EmployeeUncheckedCreateNestedManyWithoutOrganizationInput, { nullable: true })
  Employee?: EmployeeUncheckedCreateNestedManyWithoutOrganizationInput;
}
