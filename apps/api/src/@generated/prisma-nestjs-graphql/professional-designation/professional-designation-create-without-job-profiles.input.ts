import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupCreateNestedOneWithoutProfessional_designationsInput } from '../employee-group/employee-group-create-nested-one-without-professional-designations.input';

@InputType()
export class ProfessionalDesignationCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => EmployeeGroupCreateNestedOneWithoutProfessional_designationsInput, { nullable: false })
  employee_group!: EmployeeGroupCreateNestedOneWithoutProfessional_designationsInput;
}
