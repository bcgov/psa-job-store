import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeUncheckedUpdateManyWithoutDepartmentNestedInput } from '../employee/employee-unchecked-update-many-without-department-nested.input';

@InputType()
export class DepartmentUncheckedUpdateWithoutPositionsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  organization_id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => EmployeeUncheckedUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  employees?: EmployeeUncheckedUpdateManyWithoutDepartmentNestedInput;
}
