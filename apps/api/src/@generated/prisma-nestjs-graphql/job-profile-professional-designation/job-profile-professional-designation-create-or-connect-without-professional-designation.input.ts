import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput } from './job-profile-professional-designation-create-without-professional-designation.input';

@InputType()
export class JobProfileProfessionalDesignationCreateOrConnectWithoutProfessional_designationInput {
  @Field(() => JobProfileProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<
    JobProfileProfessionalDesignationWhereUniqueInput,
    'job_profile_id_professional_designation_id'
  >;

  @Field(() => JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput)
  create!: JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput;
}
