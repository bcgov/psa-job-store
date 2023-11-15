import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeStatus } from '../prisma/employee-status.enum';
import { ClassificationUpdateOneRequiredWithoutEmployeesNestedInput } from '../classification/classification-update-one-required-without-employees-nested.input';
import { OrganizationUpdateOneRequiredWithoutEmployeesNestedInput } from '../organization/organization-update-one-required-without-employees-nested.input';
import { PositionEmployeeUpdateManyWithoutEmployeeNestedInput } from '../position-employee/position-employee-update-many-without-employee-nested.input';

@InputType()
export class EmployeeUpdateWithoutDepartmentInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => EmployeeStatus, { nullable: true })
  status?: keyof typeof EmployeeStatus;

  @Field(() => ClassificationUpdateOneRequiredWithoutEmployeesNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutEmployeesNestedInput;

  @Field(() => OrganizationUpdateOneRequiredWithoutEmployeesNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneRequiredWithoutEmployeesNestedInput;

  @Field(() => PositionEmployeeUpdateManyWithoutEmployeeNestedInput, { nullable: true })
  positions?: PositionEmployeeUpdateManyWithoutEmployeeNestedInput;
}
