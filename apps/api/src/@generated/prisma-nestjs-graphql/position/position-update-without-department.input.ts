import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateOneRequiredWithoutPositionNestedInput } from '../classification/classification-update-one-required-without-position-nested.input';
import { OrganizationUpdateOneRequiredWithoutPositionNestedInput } from '../organization/organization-update-one-required-without-position-nested.input';
import { PositionEmployeeUpdateManyWithoutPositionNestedInput } from '../position-employee/position-employee-update-many-without-position-nested.input';

@InputType()
export class PositionUpdateWithoutDepartmentInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  supervisor_id?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  number?: string;

  @Field(() => String, { nullable: true })
  job_profile_number?: string;

  @Field(() => Boolean, { nullable: true })
  is_empty?: boolean;

  @Field(() => Boolean, { nullable: true })
  is_vacant?: boolean;

  @Field(() => ClassificationUpdateOneRequiredWithoutPositionNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutPositionNestedInput;

  @Field(() => OrganizationUpdateOneRequiredWithoutPositionNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneRequiredWithoutPositionNestedInput;

  @Field(() => PositionEmployeeUpdateManyWithoutPositionNestedInput, { nullable: true })
  employees?: PositionEmployeeUpdateManyWithoutPositionNestedInput;
}
