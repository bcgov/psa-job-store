import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionUpdateManyWithoutOrganizationNestedInput } from '../position/position-update-many-without-organization-nested.input';
import { EmployeeUpdateManyWithoutOrganizationNestedInput } from '../employee/employee-update-many-without-organization-nested.input';
import { JobProfileUpdateManyWithoutOrganizationNestedInput } from '../job-profile/job-profile-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUpdateWithoutDepartmentsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => PositionUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  positions?: PositionUpdateManyWithoutOrganizationNestedInput;

  @Field(() => EmployeeUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  employees?: EmployeeUpdateManyWithoutOrganizationNestedInput;

  @Field(() => JobProfileUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  job_proviles?: JobProfileUpdateManyWithoutOrganizationNestedInput;
}
