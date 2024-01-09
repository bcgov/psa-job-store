import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateNestedManyWithoutOrganizationInput } from '../department/department-create-nested-many-without-organization.input';

@InputType()
export class OrganizationCreateWithoutJobProfileOrganizationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => DepartmentCreateNestedManyWithoutOrganizationInput, { nullable: true })
  departments?: DepartmentCreateNestedManyWithoutOrganizationInput;
}
