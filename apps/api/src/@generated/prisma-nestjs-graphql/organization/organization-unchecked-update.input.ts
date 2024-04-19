import { Field, InputType } from '@nestjs/graphql';
import { DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput } from '../department/department-unchecked-update-many-without-organization-nested.input';
import { JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput } from '../job-profile-organization/job-profile-organization-unchecked-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUncheckedUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  peoplesoft_id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  effective_status?: string;

  @Field(() => Date, { nullable: true })
  effective_date?: Date | string;

  @Field(() => DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  departments?: DepartmentUncheckedUpdateManyWithoutOrganizationNestedInput;

  @Field(() => JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  JobProfileOrganization?: JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput;
}
