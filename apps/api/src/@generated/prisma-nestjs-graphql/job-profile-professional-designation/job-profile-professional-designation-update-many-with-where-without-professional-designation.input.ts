import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationScalarWhereInput } from './job-profile-professional-designation-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationUncheckedUpdateManyWithoutProfessional_designationInput } from './job-profile-professional-designation-unchecked-update-many-without-professional-designation.input';

@InputType()
export class JobProfileProfessionalDesignationUpdateManyWithWhereWithoutProfessional_designationInput {
  @Field(() => JobProfileProfessionalDesignationScalarWhereInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationScalarWhereInput)
  where!: JobProfileProfessionalDesignationScalarWhereInput;

  @Field(() => JobProfileProfessionalDesignationUncheckedUpdateManyWithoutProfessional_designationInput, {
    nullable: false,
  })
  @Type(() => JobProfileProfessionalDesignationUncheckedUpdateManyWithoutProfessional_designationInput)
  data!: JobProfileProfessionalDesignationUncheckedUpdateManyWithoutProfessional_designationInput;
}
