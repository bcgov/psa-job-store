import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationUpdateManyWithoutProfessional_designationNestedInput } from '../job-profile-professional-designation/job-profile-professional-designation-update-many-without-professional-designation-nested.input';

@InputType()
export class ProfessionalDesignationUpdateWithoutEmployee_groupInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileProfessionalDesignationUpdateManyWithoutProfessional_designationNestedInput, {
    nullable: true,
  })
  job_profiles?: JobProfileProfessionalDesignationUpdateManyWithoutProfessional_designationNestedInput;
}
