import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput } from '../department/department-unchecked-update-many-without-organization-nested.input';
import { PositionUncheckedUpdateManyWithoutOrganizationNestedInput } from '../position/position-unchecked-update-many-without-organization-nested.input';
import { EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput } from '../employee/employee-unchecked-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUncheckedUpdateWithoutJob_provilesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  departments?: DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput;

  @Field(() => PositionUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  positions?: PositionUncheckedUpdateManyWithoutOrganizationNestedInput;

  @Field(() => EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  employees?: EmployeeUncheckedUpdateManyWithoutOrganizationNestedInput;
}
