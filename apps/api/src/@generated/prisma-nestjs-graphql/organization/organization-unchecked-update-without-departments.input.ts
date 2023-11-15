import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionUncheckedUpdateManyWithoutOrganizationNestedInput } from '../position/position-unchecked-update-many-without-organization-nested.input';
import { EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput } from '../employee/employee-unchecked-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUncheckedUpdateWithoutDepartmentsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => PositionUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  Position?: PositionUncheckedUpdateManyWithoutOrganizationNestedInput;

  @Field(() => EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  Employee?: EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput;
}
