import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateNestedOneWithoutDepartmentsInput } from '../organization/organization-create-nested-one-without-departments.input';
import { PositionRequestCreateNestedManyWithoutDepartmentInput } from '../position-request/position-request-create-nested-many-without-department.input';
import { PositionRequestCreateNestedManyWithoutPaylist_departmentInput } from '../position-request/position-request-create-nested-many-without-paylist-department.input';

@InputType()
export class DepartmentCreateWithoutLocationInput {
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

  @Field(() => OrganizationCreateNestedOneWithoutDepartmentsInput, { nullable: false })
  organization!: OrganizationCreateNestedOneWithoutDepartmentsInput;

  @Field(() => PositionRequestCreateNestedManyWithoutDepartmentInput, { nullable: true })
  PositionRequest?: PositionRequestCreateNestedManyWithoutDepartmentInput;

  @Field(() => PositionRequestCreateNestedManyWithoutPaylist_departmentInput, { nullable: true })
  PositionRequestsByPaylistDepartment?: PositionRequestCreateNestedManyWithoutPaylist_departmentInput;
}
