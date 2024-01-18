import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';
import { ProfessionalDesignationRelationFilter } from '../professional-designation/professional-designation-relation-filter.input';

@InputType()
export class JobProfileProfessionalDesignationWhereInput {
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
