import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateNestedOneWithoutPositionsInput } from '../department/department-create-nested-one-without-positions.input';
import { OrganizationCreateNestedOneWithoutPositionsInput } from '../organization/organization-create-nested-one-without-positions.input';
import { PositionEmployeeCreateNestedManyWithoutPositionInput } from '../position-employee/position-employee-create-nested-many-without-position.input';

@InputType()
export class PositionCreateWithoutClassificationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  supervisor_id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  job_profile_number?: string;

  @Field(() => Boolean, { nullable: false })
  is_empty!: boolean;

  @Field(() => Boolean, { nullable: false })
  is_vacant!: boolean;

  @Field(() => DepartmentCreateNestedOneWithoutPositionsInput, { nullable: false })
  department!: DepartmentCreateNestedOneWithoutPositionsInput;

  @Field(() => OrganizationCreateNestedOneWithoutPositionsInput, { nullable: false })
  organization!: OrganizationCreateNestedOneWithoutPositionsInput;

  @Field(() => PositionEmployeeCreateNestedManyWithoutPositionInput, { nullable: true })
  employees?: PositionEmployeeCreateNestedManyWithoutPositionInput;
}
