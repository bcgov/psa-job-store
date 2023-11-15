import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateOneRequiredWithoutPositionsNestedInput } from '../classification/classification-update-one-required-without-positions-nested.input';
import { DepartmentUpdateOneRequiredWithoutPositionsNestedInput } from '../department/department-update-one-required-without-positions-nested.input';
import { OrganizationUpdateOneRequiredWithoutPositionsNestedInput } from '../organization/organization-update-one-required-without-positions-nested.input';

@InputType()
export class PositionUpdateWithoutEmployeesInput {
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

  @Field(() => ClassificationUpdateOneRequiredWithoutPositionsNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutPositionsNestedInput;

  @Field(() => DepartmentUpdateOneRequiredWithoutPositionsNestedInput, { nullable: true })
  department?: DepartmentUpdateOneRequiredWithoutPositionsNestedInput;

  @Field(() => OrganizationUpdateOneRequiredWithoutPositionsNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneRequiredWithoutPositionsNestedInput;
}
