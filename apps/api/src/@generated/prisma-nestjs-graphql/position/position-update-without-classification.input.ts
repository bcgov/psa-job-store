import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUpdateOneRequiredWithoutPositionsNestedInput } from '../department/department-update-one-required-without-positions-nested.input';
import { OrganizationUpdateOneRequiredWithoutPositionsNestedInput } from '../organization/organization-update-one-required-without-positions-nested.input';
import { PositionEmployeeUpdateManyWithoutPositionNestedInput } from '../position-employee/position-employee-update-many-without-position-nested.input';

@InputType()
export class PositionUpdateWithoutClassificationInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  supervisor_id?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  job_profile_number?: string;

  @Field(() => Boolean, { nullable: true })
  is_empty?: boolean;

  @Field(() => Boolean, { nullable: true })
  is_vacant?: boolean;

  @Field(() => DepartmentUpdateOneRequiredWithoutPositionsNestedInput, { nullable: true })
  department?: DepartmentUpdateOneRequiredWithoutPositionsNestedInput;

  @Field(() => OrganizationUpdateOneRequiredWithoutPositionsNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneRequiredWithoutPositionsNestedInput;

  @Field(() => PositionEmployeeUpdateManyWithoutPositionNestedInput, { nullable: true })
  employees?: PositionEmployeeUpdateManyWithoutPositionNestedInput;
}
