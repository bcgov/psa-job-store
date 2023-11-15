import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeStatus } from '../prisma/employee-status.enum';
import { PositionEmployeeUncheckedCreateNestedManyWithoutEmployeeInput } from '../position-employee/position-employee-unchecked-create-nested-many-without-employee.input';

@InputType()
export class EmployeeUncheckedCreateWithoutOrganizationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  classification_id!: string;

  @Field(() => String, { nullable: false })
  department_id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => EmployeeStatus, { nullable: true })
  status?: keyof typeof EmployeeStatus;

  @Field(() => PositionEmployeeUncheckedCreateNestedManyWithoutEmployeeInput, { nullable: true })
  positions?: PositionEmployeeUncheckedCreateNestedManyWithoutEmployeeInput;
}
