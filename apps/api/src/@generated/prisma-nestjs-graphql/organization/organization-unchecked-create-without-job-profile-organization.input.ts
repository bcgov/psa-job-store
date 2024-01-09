import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUncheckedCreateNestedManyWithoutOrganizationInput } from '../department/department-unchecked-create-nested-many-without-organization.input';

@InputType()
export class OrganizationUncheckedCreateWithoutJobProfileOrganizationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => DepartmentUncheckedCreateNestedManyWithoutOrganizationInput, { nullable: true })
  departments?: DepartmentUncheckedCreateNestedManyWithoutOrganizationInput;
}
