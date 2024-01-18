import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupUpdateOneRequiredWithoutProfessional_designationsNestedInput } from '../employee-group/employee-group-update-one-required-without-professional-designations-nested.input';

@InputType()
export class ProfessionalDesignationUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => EmployeeGroupUpdateOneRequiredWithoutProfessional_designationsNestedInput, { nullable: true })
  employee_group?: EmployeeGroupUpdateOneRequiredWithoutProfessional_designationsNestedInput;
}
