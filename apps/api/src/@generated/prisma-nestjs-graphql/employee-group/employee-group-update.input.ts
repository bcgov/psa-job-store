import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationUpdateManyWithoutEmployee_groupNestedInput } from '../professional-designation/professional-designation-update-many-without-employee-group-nested.input';

@InputType()
export class EmployeeGroupUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => ProfessionalDesignationUpdateManyWithoutEmployee_groupNestedInput, { nullable: true })
  professional_designations?: ProfessionalDesignationUpdateManyWithoutEmployee_groupNestedInput;
}
