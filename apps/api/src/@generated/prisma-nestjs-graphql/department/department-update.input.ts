import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationUpdateOneRequiredWithoutDepartmentsNestedInput } from '../organization/organization-update-one-required-without-departments-nested.input';
import { PositionRequestUpdateManyWithoutDepartmentNestedInput } from '../position-request/position-request-update-many-without-department-nested.input';

@InputType()
export class DepartmentUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => OrganizationUpdateOneRequiredWithoutDepartmentsNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneRequiredWithoutDepartmentsNestedInput;

  @Field(() => PositionRequestUpdateManyWithoutDepartmentNestedInput, { nullable: true })
  PositionRequest?: PositionRequestUpdateManyWithoutDepartmentNestedInput;
}
