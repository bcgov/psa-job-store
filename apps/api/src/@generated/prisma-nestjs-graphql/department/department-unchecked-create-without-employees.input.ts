import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionUncheckedCreateNestedManyWithoutDepartmentInput } from '../position/position-unchecked-create-nested-many-without-department.input';

@InputType()
export class DepartmentUncheckedCreateWithoutEmployeesInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  organization_id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => PositionUncheckedCreateNestedManyWithoutDepartmentInput, { nullable: true })
  positions?: PositionUncheckedCreateNestedManyWithoutDepartmentInput;
}
