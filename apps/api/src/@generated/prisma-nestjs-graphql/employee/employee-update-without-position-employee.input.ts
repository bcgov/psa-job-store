import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeStatus } from '../prisma/employee-status.enum';
import { ClassificationUpdateOneRequiredWithoutEmployeeNestedInput } from '../classification/classification-update-one-required-without-employee-nested.input';
import { DepartmentUpdateOneRequiredWithoutEmployeeNestedInput } from '../department/department-update-one-required-without-employee-nested.input';
import { OrganizationUpdateOneRequiredWithoutEmployeeNestedInput } from '../organization/organization-update-one-required-without-employee-nested.input';

@InputType()
export class EmployeeUpdateWithoutPositionEmployeeInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => EmployeeStatus, { nullable: true })
  status?: keyof typeof EmployeeStatus;

  @Field(() => ClassificationUpdateOneRequiredWithoutEmployeeNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutEmployeeNestedInput;

  @Field(() => DepartmentUpdateOneRequiredWithoutEmployeeNestedInput, { nullable: true })
  department?: DepartmentUpdateOneRequiredWithoutEmployeeNestedInput;

  @Field(() => OrganizationUpdateOneRequiredWithoutEmployeeNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneRequiredWithoutEmployeeNestedInput;
}
