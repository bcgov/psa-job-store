import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationUpdateInput } from './job-profile-professional-designation-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileProfessionalDesignationArgs {
  @Field(() => JobProfileProfessionalDesignationUpdateInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationUpdateInput)
  data!: JobProfileProfessionalDesignationUpdateInput;

  @Field(() => JobProfileProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<
    JobProfileProfessionalDesignationWhereUniqueInput,
    'job_profile_id_professional_designation_id'
  >;
}
