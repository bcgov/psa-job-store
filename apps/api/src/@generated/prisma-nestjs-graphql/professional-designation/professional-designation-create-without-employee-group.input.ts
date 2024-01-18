import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationCreateNestedManyWithoutProfessional_designationInput } from '../job-profile-professional-designation/job-profile-professional-designation-create-nested-many-without-professional-designation.input';

@InputType()
export class ProfessionalDesignationCreateWithoutEmployee_groupInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileProfessionalDesignationCreateNestedManyWithoutProfessional_designationInput, {
    nullable: true,
  })
  job_profiles?: JobProfileProfessionalDesignationCreateNestedManyWithoutProfessional_designationInput;
}
