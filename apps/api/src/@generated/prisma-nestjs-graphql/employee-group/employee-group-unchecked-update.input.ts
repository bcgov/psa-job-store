import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationUncheckedUpdateManyWithoutEmployee_groupNestedInput } from '../professional-designation/professional-designation-unchecked-update-many-without-employee-group-nested.input';

@InputType()
export class EmployeeGroupUncheckedUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => ProfessionalDesignationUncheckedUpdateManyWithoutEmployee_groupNestedInput, { nullable: true })
  professional_designations?: ProfessionalDesignationUncheckedUpdateManyWithoutEmployee_groupNestedInput;
}
