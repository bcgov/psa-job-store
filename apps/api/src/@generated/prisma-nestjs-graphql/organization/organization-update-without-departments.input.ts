import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionUpdateManyWithoutOrganizationNestedInput } from '../position/position-update-many-without-organization-nested.input';
import { EmployeeUpdateManyWithoutOrganizationNestedInput } from '../employee/employee-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUpdateWithoutDepartmentsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => PositionUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  Position?: PositionUpdateManyWithoutOrganizationNestedInput;

  @Field(() => EmployeeUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  Employee?: EmployeeUpdateManyWithoutOrganizationNestedInput;
}
