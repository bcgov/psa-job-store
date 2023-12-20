import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionEmployeeUncheckedUpdateManyWithoutPositionNestedInput } from '../position-employee/position-employee-unchecked-update-many-without-position-nested.input';

@InputType()
export class PositionUncheckedUpdateWithoutDepartmentInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  classification_id?: string;

  @Field(() => String, { nullable: true })
  organization_id?: string;

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

  @Field(() => PositionEmployeeUncheckedUpdateManyWithoutPositionNestedInput, { nullable: true })
  employees?: PositionEmployeeUncheckedUpdateManyWithoutPositionNestedInput;
}
