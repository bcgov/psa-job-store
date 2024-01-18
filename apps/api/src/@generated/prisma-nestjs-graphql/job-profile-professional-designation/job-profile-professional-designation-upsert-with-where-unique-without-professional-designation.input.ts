import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationUpdateWithoutProfessional_designationInput } from './job-profile-professional-designation-update-without-professional-designation.input';
import { JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput } from './job-profile-professional-designation-create-without-professional-designation.input';

@InputType()
export class JobProfileProfessionalDesignationUpsertWithWhereUniqueWithoutProfessional_designationInput {
  @Field(() => JobProfileProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<
    JobProfileProfessionalDesignationWhereUniqueInput,
    'job_profile_id_professional_designation_id'
  >;

  @Field(() => JobProfileProfessionalDesignationUpdateWithoutProfessional_designationInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationUpdateWithoutProfessional_designationInput)
  update!: JobProfileProfessionalDesignationUpdateWithoutProfessional_designationInput;

  @Field(() => JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput)
  create!: JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput;
}
