import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionEmployeeUncheckedCreateNestedManyWithoutPositionInput } from '../position-employee/position-employee-unchecked-create-nested-many-without-position.input';

@InputType()
export class PositionUncheckedCreateWithoutOrganizationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  classification_id!: string;

  @Field(() => String, { nullable: false })
  department_id!: string;

  @Field(() => String, { nullable: false })
  supervisor_id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  number?: string;

  @Field(() => String, { nullable: true })
  job_profile_number?: string;

  @Field(() => Boolean, { nullable: false })
  is_empty!: boolean;

  @Field(() => Boolean, { nullable: false })
  is_vacant!: boolean;

  @Field(() => PositionEmployeeUncheckedCreateNestedManyWithoutPositionInput, { nullable: true })
  employees?: PositionEmployeeUncheckedCreateNestedManyWithoutPositionInput;
}
