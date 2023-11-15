import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateNestedOneWithoutPositionInput } from '../classification/classification-create-nested-one-without-position.input';
import { OrganizationCreateNestedOneWithoutPositionInput } from '../organization/organization-create-nested-one-without-position.input';
import { PositionEmployeeCreateNestedManyWithoutPositionInput } from '../position-employee/position-employee-create-nested-many-without-position.input';

@InputType()
export class PositionCreateWithoutDepartmentInput {
  @Field(() => String, { nullable: false })
  id!: string;

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

  @Field(() => ClassificationCreateNestedOneWithoutPositionInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutPositionInput;

  @Field(() => OrganizationCreateNestedOneWithoutPositionInput, { nullable: false })
  organization!: OrganizationCreateNestedOneWithoutPositionInput;

  @Field(() => PositionEmployeeCreateNestedManyWithoutPositionInput, { nullable: true })
  employees?: PositionEmployeeCreateNestedManyWithoutPositionInput;
}
