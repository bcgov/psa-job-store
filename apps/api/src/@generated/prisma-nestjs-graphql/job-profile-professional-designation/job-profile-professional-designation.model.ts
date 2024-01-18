import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfile } from '../job-profile/job-profile.model';
import { ProfessionalDesignation } from '../professional-designation/professional-designation.model';

@ObjectType()
export class JobProfileProfessionalDesignation {
  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => Int, { nullable: false })
  professional_designation_id!: number;

  @Field(() => JobProfile, { nullable: false })
  job_profile?: JobProfile;

  @Field(() => ProfessionalDesignation, { nullable: false })
  professional_designation?: ProfessionalDesignation;
}
