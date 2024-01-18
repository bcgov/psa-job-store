import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput } from './job-profile-professional-designation-create-without-professional-designation.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationCreateOrConnectWithoutProfessional_designationInput } from './job-profile-professional-designation-create-or-connect-without-professional-designation.input';
import { JobProfileProfessionalDesignationCreateManyProfessional_designationInputEnvelope } from './job-profile-professional-designation-create-many-professional-designation-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';

@InputType()
export class JobProfileProfessionalDesignationUncheckedCreateNestedManyWithoutProfessional_designationInput {
  @Field(() => [JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput)
  create?: Array<JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput>;

  @Field(() => [JobProfileProfessionalDesignationCreateOrConnectWithoutProfessional_designationInput], {
    nullable: true,
  })
  @Type(() => JobProfileProfessionalDesignationCreateOrConnectWithoutProfessional_designationInput)
  connectOrCreate?: Array<JobProfileProfessionalDesignationCreateOrConnectWithoutProfessional_designationInput>;

  @Field(() => JobProfileProfessionalDesignationCreateManyProfessional_designationInputEnvelope, { nullable: true })
  @Type(() => JobProfileProfessionalDesignationCreateManyProfessional_designationInputEnvelope)
  createMany?: JobProfileProfessionalDesignationCreateManyProfessional_designationInputEnvelope;

  @Field(() => [JobProfileProfessionalDesignationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  connect?: Array<
    Prisma.AtLeast<JobProfileProfessionalDesignationWhereUniqueInput, 'job_profile_id_professional_designation_id'>
  >;
}
