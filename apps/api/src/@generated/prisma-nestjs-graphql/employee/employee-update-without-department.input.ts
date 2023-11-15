import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeStatus } from '../prisma/employee-status.enum';
import { ClassificationUpdateOneRequiredWithoutEmployeeNestedInput } from '../classification/classification-update-one-required-without-employee-nested.input';
import { OrganizationUpdateOneRequiredWithoutEmployeeNestedInput } from '../organization/organization-update-one-required-without-employee-nested.input';
import { PositionEmployeeUpdateManyWithoutEmployeeNestedInput } from '../position-employee/position-employee-update-many-without-employee-nested.input';

@InputType()
export class EmployeeUpdateWithoutDepartmentInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => EmployeeStatus, { nullable: true })
  status?: keyof typeof EmployeeStatus;

  @Field(() => ClassificationUpdateOneRequiredWithoutEmployeeNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutEmployeeNestedInput;

  @Field(() => OrganizationUpdateOneRequiredWithoutEmployeeNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneRequiredWithoutEmployeeNestedInput;

  @Field(() => PositionEmployeeUpdateManyWithoutEmployeeNestedInput, { nullable: true })
  PositionEmployee?: PositionEmployeeUpdateManyWithoutEmployeeNestedInput;
}
