import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationCreateNestedOneWithoutDepartmentInput } from '../location/location-create-nested-one-without-department.input';
import { OrganizationCreateNestedOneWithoutDepartmentsInput } from '../organization/organization-create-nested-one-without-departments.input';
import { PositionRequestCreateNestedManyWithoutDepartmentInput } from '../position-request/position-request-create-nested-many-without-department.input';

@InputType()
export class DepartmentCreateInput {
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

  @Field(() => LocationCreateNestedOneWithoutDepartmentInput, { nullable: false })
  location!: LocationCreateNestedOneWithoutDepartmentInput;

  @Field(() => OrganizationCreateNestedOneWithoutDepartmentsInput, { nullable: false })
  organization!: OrganizationCreateNestedOneWithoutDepartmentsInput;

  @Field(() => PositionRequestCreateNestedManyWithoutDepartmentInput, { nullable: true })
  PositionRequest?: PositionRequestCreateNestedManyWithoutDepartmentInput;
}
