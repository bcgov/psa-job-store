import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionUncheckedCreateNestedManyWithoutDepartmentInput } from '../position/position-unchecked-create-nested-many-without-department.input';
import { EmployeeUncheckedCreateNestedManyWithoutDepartmentInput } from '../employee/employee-unchecked-create-nested-many-without-department.input';

@InputType()
export class DepartmentUncheckedCreateWithoutOrganizationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => PositionUncheckedCreateNestedManyWithoutDepartmentInput, { nullable: true })
  Position?: PositionUncheckedCreateNestedManyWithoutDepartmentInput;

  @Field(() => EmployeeUncheckedCreateNestedManyWithoutDepartmentInput, { nullable: true })
  Employee?: EmployeeUncheckedCreateNestedManyWithoutDepartmentInput;
}
