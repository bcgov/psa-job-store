import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationUpdateOneRequiredWithoutDepartmentNestedInput } from '../location/location-update-one-required-without-department-nested.input';

@InputType()
export class DepartmentUpdateWithoutOrganizationInput {
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

  @Field(() => LocationUpdateOneRequiredWithoutDepartmentNestedInput, { nullable: true })
  location?: LocationUpdateOneRequiredWithoutDepartmentNestedInput;
}
