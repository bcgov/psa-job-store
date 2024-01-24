import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileContextScalarFieldEnum {
  id = 'id',
  job_profile_id = 'job_profile_id',
  description = 'description',
}

registerEnumType(JobProfileContextScalarFieldEnum, {
  name: 'JobProfileContextScalarFieldEnum',
  description: undefined,
});
