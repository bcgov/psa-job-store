import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationCreateWithoutJob_profileInput } from './job-profile-professional-designation-create-without-job-profile.input';

@InputType()
export class JobProfileProfessionalDesignationCreateOrConnectWithoutJob_profileInput {
  @Field(() => JobProfileProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<
    JobProfileProfessionalDesignationWhereUniqueInput,
    'job_profile_id_professional_designation_id'
  >;

  @Field(() => JobProfileProfessionalDesignationCreateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationCreateWithoutJob_profileInput)
  create!: JobProfileProfessionalDesignationCreateWithoutJob_profileInput;
}
