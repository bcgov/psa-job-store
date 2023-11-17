import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUpdateManyWithoutOrganizationNestedInput } from '../department/department-update-many-without-organization-nested.input';
import { PositionUpdateManyWithoutOrganizationNestedInput } from '../position/position-update-many-without-organization-nested.input';
import { EmployeeUpdateManyWithoutOrganizationNestedInput } from '../employee/employee-update-many-without-organization-nested.input';
import { JobProfileUpdateManyWithoutOrganizationNestedInput } from '../job-profile/job-profile-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => DepartmentUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  departments?: DepartmentUpdateManyWithoutOrganizationNestedInput;

  @Field(() => PositionUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  positions?: PositionUpdateManyWithoutOrganizationNestedInput;

  @Field(() => EmployeeUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  employees?: EmployeeUpdateManyWithoutOrganizationNestedInput;

  @Field(() => JobProfileUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  job_proviles?: JobProfileUpdateManyWithoutOrganizationNestedInput;
}
