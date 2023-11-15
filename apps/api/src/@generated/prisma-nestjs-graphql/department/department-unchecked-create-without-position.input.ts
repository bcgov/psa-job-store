import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeUncheckedCreateNestedManyWithoutDepartmentInput } from '../employee/employee-unchecked-create-nested-many-without-department.input';

@InputType()
export class DepartmentUncheckedCreateWithoutPositionInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  organization_id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => EmployeeUncheckedCreateNestedManyWithoutDepartmentInput, { nullable: true })
  Employee?: EmployeeUncheckedCreateNestedManyWithoutDepartmentInput;
}
