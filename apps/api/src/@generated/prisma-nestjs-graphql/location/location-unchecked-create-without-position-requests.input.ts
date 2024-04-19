import { Field, InputType } from '@nestjs/graphql';
import { DepartmentUncheckedCreateNestedManyWithoutLocationInput } from '../department/department-unchecked-create-nested-many-without-location.input';

@InputType()
export class LocationUncheckedCreateWithoutPositionRequestsInput {
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

  @Field(() => DepartmentUncheckedCreateNestedManyWithoutLocationInput, { nullable: true })
  departments?: DepartmentUncheckedCreateNestedManyWithoutLocationInput;
}
