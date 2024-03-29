import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestUncheckedCreateNestedManyWithoutDepartmentInput } from '../position-request/position-request-unchecked-create-nested-many-without-department.input';
import { PositionRequestUncheckedCreateNestedManyWithoutPaylist_departmentInput } from '../position-request/position-request-unchecked-create-nested-many-without-paylist-department.input';

@InputType()
export class DepartmentUncheckedCreateWithoutLocationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  organization_id!: string;

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

  @Field(() => PositionRequestUncheckedCreateNestedManyWithoutDepartmentInput, { nullable: true })
  PositionRequest?: PositionRequestUncheckedCreateNestedManyWithoutDepartmentInput;

  @Field(() => PositionRequestUncheckedCreateNestedManyWithoutPaylist_departmentInput, { nullable: true })
  PositionRequestsByPaylistDepartment?: PositionRequestUncheckedCreateNestedManyWithoutPaylist_departmentInput;
}
