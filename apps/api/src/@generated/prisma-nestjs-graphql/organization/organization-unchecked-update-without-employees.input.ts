import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput } from '../department/department-unchecked-update-many-without-organization-nested.input';
import { PositionUncheckedUpdateManyWithoutOrganizationNestedInput } from '../position/position-unchecked-update-many-without-organization-nested.input';
import { JobProfileUncheckedUpdateManyWithoutOrganizationNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUncheckedUpdateWithoutEmployeesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  departments?: DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput;

  @Field(() => PositionUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  positions?: PositionUncheckedUpdateManyWithoutOrganizationNestedInput;

  @Field(() => JobProfileUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  job_proviles?: JobProfileUncheckedUpdateManyWithoutOrganizationNestedInput;
}
