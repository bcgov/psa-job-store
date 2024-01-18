import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationUpdateWithoutProfessional_designationInput } from './job-profile-professional-designation-update-without-professional-designation.input';

@InputType()
export class JobProfileProfessionalDesignationUpdateWithWhereUniqueWithoutProfessional_designationInput {
  @Field(() => JobProfileProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<
    JobProfileProfessionalDesignationWhereUniqueInput,
    'job_profile_id_professional_designation_id'
  >;

  @Field(() => JobProfileProfessionalDesignationUpdateWithoutProfessional_designationInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationUpdateWithoutProfessional_designationInput)
  data!: JobProfileProfessionalDesignationUpdateWithoutProfessional_designationInput;
}
