import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileProfessionalDesignationScalarFieldEnum {
  job_profile_id = 'job_profile_id',
  professional_designation_id = 'professional_designation_id',
}

registerEnumType(JobProfileProfessionalDesignationScalarFieldEnum, {
  name: 'JobProfileProfessionalDesignationScalarFieldEnum',
  description: undefined,
});
