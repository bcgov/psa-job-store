import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationCreateNestedOneWithoutDepartmentsInput } from '../location/location-create-nested-one-without-departments.input';
import { OrganizationCreateNestedOneWithoutDepartmentsInput } from '../organization/organization-create-nested-one-without-departments.input';
import { PositionRequestCreateNestedManyWithoutPaylist_departmentInput } from '../position-request/position-request-create-nested-many-without-paylist-department.input';

@InputType()
export class DepartmentCreateWithoutPositionRequestInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date | string;

  @Field(() => LocationCreateNestedOneWithoutDepartmentsInput, { nullable: false })
  location!: LocationCreateNestedOneWithoutDepartmentsInput;

  @Field(() => OrganizationCreateNestedOneWithoutDepartmentsInput, { nullable: false })
  organization!: OrganizationCreateNestedOneWithoutDepartmentsInput;

  @Field(() => PositionRequestCreateNestedManyWithoutPaylist_departmentInput, { nullable: true })
  PositionRequestsByPaylistDepartment?: PositionRequestCreateNestedManyWithoutPaylist_departmentInput;
}
