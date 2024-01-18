import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationUpdateWithoutJob_profileInput } from './job-profile-professional-designation-update-without-job-profile.input';

@InputType()
export class JobProfileProfessionalDesignationUpdateWithWhereUniqueWithoutJob_profileInput {
  @Field(() => JobProfileProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<
    JobProfileProfessionalDesignationWhereUniqueInput,
    'job_profile_id_professional_designation_id'
  >;

  @Field(() => JobProfileProfessionalDesignationUpdateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationUpdateWithoutJob_profileInput)
  data!: JobProfileProfessionalDesignationUpdateWithoutJob_profileInput;
}
