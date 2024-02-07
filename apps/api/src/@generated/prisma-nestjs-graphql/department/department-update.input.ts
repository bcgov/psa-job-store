import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationUpdateOneRequiredWithoutDepartmentsNestedInput } from '../location/location-update-one-required-without-departments-nested.input';
import { OrganizationUpdateOneRequiredWithoutDepartmentsNestedInput } from '../organization/organization-update-one-required-without-departments-nested.input';
import { PositionRequestUpdateManyWithoutDepartmentNestedInput } from '../position-request/position-request-update-many-without-department-nested.input';
import { PositionRequestUpdateManyWithoutPaylist_departmentNestedInput } from '../position-request/position-request-update-many-without-paylist-department-nested.input';
import { ClassificationDepartmentUpdateManyWithoutDepartmentNestedInput } from '../classification-department/classification-department-update-many-without-department-nested.input';

@InputType()
export class DepartmentUpdateInput {
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

  @Field(() => LocationUpdateOneRequiredWithoutDepartmentsNestedInput, { nullable: true })
  location?: LocationUpdateOneRequiredWithoutDepartmentsNestedInput;

  @Field(() => OrganizationUpdateOneRequiredWithoutDepartmentsNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneRequiredWithoutDepartmentsNestedInput;

  @Field(() => PositionRequestUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  PositionRequest?: PositionRequestUpdateManyWithoutDepartmentNestedInput;

  @Field(() => PositionRequestUpdateManyWithoutPaylist_departmentNestedInput, { nullable: true })
  PositionRequestsByPaylistDepartment?: PositionRequestUpdateManyWithoutPaylist_departmentNestedInput;

  @Field(() => ClassificationDepartmentUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  classifications?: ClassificationDepartmentUpdateManyWithoutDepartmentNestedInput;
}
