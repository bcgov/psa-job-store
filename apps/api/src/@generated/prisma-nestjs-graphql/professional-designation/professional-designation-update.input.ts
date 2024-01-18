import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupUpdateOneRequiredWithoutProfessional_designationsNestedInput } from '../employee-group/employee-group-update-one-required-without-professional-designations-nested.input';
import { JobProfileProfessionalDesignationUpdateManyWithoutProfessional_designationNestedInput } from '../job-profile-professional-designation/job-profile-professional-designation-update-many-without-professional-designation-nested.input';

@InputType()
export class ProfessionalDesignationUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => EmployeeGroupUpdateOneRequiredWithoutProfessional_designationsNestedInput, { nullable: true })
  employee_group?: EmployeeGroupUpdateOneRequiredWithoutProfessional_designationsNestedInput;

  @Field(() => JobProfileProfessionalDesignationUpdateManyWithoutProfessional_designationNestedInput, {
    nullable: true,
  })
  job_profiles?: JobProfileProfessionalDesignationUpdateManyWithoutProfessional_designationNestedInput;
}
