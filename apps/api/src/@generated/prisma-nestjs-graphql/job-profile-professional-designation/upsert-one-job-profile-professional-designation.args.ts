import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationCreateInput } from './job-profile-professional-designation-create.input';
import { JobProfileProfessionalDesignationUpdateInput } from './job-profile-professional-designation-update.input';

@ArgsType()
export class UpsertOneJobProfileProfessionalDesignationArgs {
  @Field(() => JobProfileProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<
    JobProfileProfessionalDesignationWhereUniqueInput,
    'job_profile_id_professional_designation_id'
  >;

  @Field(() => JobProfileProfessionalDesignationCreateInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationCreateInput)
  create!: JobProfileProfessionalDesignationCreateInput;

  @Field(() => JobProfileProfessionalDesignationUpdateInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationUpdateInput)
  update!: JobProfileProfessionalDesignationUpdateInput;
}
