import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileOrganizationScalarFieldEnum {
  organization_id = 'organization_id',
  job_profile_id = 'job_profile_id',
}

registerEnumType(JobProfileOrganizationScalarFieldEnum, {
  name: 'JobProfileOrganizationScalarFieldEnum',
  description: undefined,
});
