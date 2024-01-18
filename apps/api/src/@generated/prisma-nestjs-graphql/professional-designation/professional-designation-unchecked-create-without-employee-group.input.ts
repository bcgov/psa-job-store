import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationUncheckedCreateNestedManyWithoutProfessional_designationInput } from '../job-profile-professional-designation/job-profile-professional-designation-unchecked-create-nested-many-without-professional-designation.input';

@InputType()
export class ProfessionalDesignationUncheckedCreateWithoutEmployee_groupInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileProfessionalDesignationUncheckedCreateNestedManyWithoutProfessional_designationInput, {
    nullable: true,
  })
  job_profiles?: JobProfileProfessionalDesignationUncheckedCreateNestedManyWithoutProfessional_designationInput;
}
