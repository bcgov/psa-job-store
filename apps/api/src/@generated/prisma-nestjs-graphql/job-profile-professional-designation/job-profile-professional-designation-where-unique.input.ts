import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationJob_profile_idProfessional_designation_idCompoundUniqueInput } from './job-profile-professional-designation-job-profile-id-professional-designation-id-compound-unique.input';
import { JobProfileProfessionalDesignationWhereInput } from './job-profile-professional-designation-where.input';
import { IntFilter } from '../prisma/int-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';
import { ProfessionalDesignationRelationFilter } from '../professional-designation/professional-designation-relation-filter.input';

@InputType()
export class JobProfileProfessionalDesignationWhereUniqueInput {
  @Field(() => JobProfileProfessionalDesignationJob_profile_idProfessional_designation_idCompoundUniqueInput, {
    nullable: true,
  })
  job_profile_id_professional_designation_id?: JobProfileProfessionalDesignationJob_profile_idProfessional_designation_idCompoundUniqueInput;

  @Field(() => [JobProfileProfessionalDesignationWhereInput], { nullable: true })
  AND?: Array<JobProfileProfessionalDesignationWhereInput>;

  @Field(() => [JobProfileProfessionalDesignationWhereInput], { nullable: true })
  OR?: Array<JobProfileProfessionalDesignationWhereInput>;

  @Field(() => [JobProfileProfessionalDesignationWhereInput], { nullable: true })
  NOT?: Array<JobProfileProfessionalDesignationWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  professional_designation_id?: IntFilter;

  @Field(() => JobProfileRelationFilter, { nullable: true })
  job_profile?: JobProfileRelationFilter;

  @Field(() => ProfessionalDesignationRelationFilter, { nullable: true })
  professional_designation?: ProfessionalDesignationRelationFilter;
}
