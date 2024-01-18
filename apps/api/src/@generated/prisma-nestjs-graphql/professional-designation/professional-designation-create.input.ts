import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupCreateNestedOneWithoutProfessional_designationsInput } from '../employee-group/employee-group-create-nested-one-without-professional-designations.input';
import { JobProfileProfessionalDesignationCreateNestedManyWithoutProfessional_designationInput } from '../job-profile-professional-designation/job-profile-professional-designation-create-nested-many-without-professional-designation.input';

@InputType()
export class ProfessionalDesignationCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => EmployeeGroupCreateNestedOneWithoutProfessional_designationsInput, { nullable: false })
  employee_group!: EmployeeGroupCreateNestedOneWithoutProfessional_designationsInput;

  @Field(() => JobProfileProfessionalDesignationCreateNestedManyWithoutProfessional_designationInput, {
    nullable: true,
  })
  job_profiles?: JobProfileProfessionalDesignationCreateNestedManyWithoutProfessional_designationInput;
}
