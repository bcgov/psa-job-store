import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationUncheckedUpdateManyWithoutProfessional_designationNestedInput } from '../job-profile-professional-designation/job-profile-professional-designation-unchecked-update-many-without-professional-designation-nested.input';

@InputType()
export class ProfessionalDesignationUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  employee_group_id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileProfessionalDesignationUncheckedUpdateManyWithoutProfessional_designationNestedInput, {
    nullable: true,
  })
  job_profiles?: JobProfileProfessionalDesignationUncheckedUpdateManyWithoutProfessional_designationNestedInput;
}
