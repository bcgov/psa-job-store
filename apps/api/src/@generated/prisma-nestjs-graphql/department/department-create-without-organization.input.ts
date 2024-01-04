import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationCreateNestedOneWithoutDepartmentsInput } from '../location/location-create-nested-one-without-departments.input';

@InputType()
export class DepartmentCreateWithoutOrganizationInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date | string;

  @Field(() => LocationCreateNestedOneWithoutDepartmentsInput, { nullable: false })
  location!: LocationCreateNestedOneWithoutDepartmentsInput;
}
