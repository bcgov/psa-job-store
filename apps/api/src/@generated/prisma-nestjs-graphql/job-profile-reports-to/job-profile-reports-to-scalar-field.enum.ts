import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileReportsToScalarFieldEnum {
  classification_id = 'classification_id',
  job_profile_id = 'job_profile_id',
}

registerEnumType(JobProfileReportsToScalarFieldEnum, {
  name: 'JobProfileReportsToScalarFieldEnum',
  description: undefined,
});
