import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUpdateManyWithoutOrganizationNestedInput } from '../department/department-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  peoplesoft_id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  effective_status?: string;

  @Field(() => Date, { nullable: true })
  effective_date?: Date | string;

  @Field(() => DepartmentUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  departments?: DepartmentUpdateManyWithoutOrganizationNestedInput;
}
