import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeStatus } from '../prisma/employee-status.enum';
import { PositionEmployeeUncheckedUpdateManyWithoutEmployeeNestedInput } from '../position-employee/position-employee-unchecked-update-many-without-employee-nested.input';

@InputType()
export class EmployeeUncheckedUpdateWithoutOrganizationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  classification_id?: string;

  @Field(() => String, { nullable: true })
  department_id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => EmployeeStatus, { nullable: true })
  status?: keyof typeof EmployeeStatus;

  @Field(() => PositionEmployeeUncheckedUpdateManyWithoutEmployeeNestedInput, { nullable: true })
  positions?: PositionEmployeeUncheckedUpdateManyWithoutEmployeeNestedInput;
}
