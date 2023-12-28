import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileClassificationScalarFieldEnum {
  classification_id = 'classification_id',
  job_profile_id = 'job_profile_id',
}

registerEnumType(JobProfileClassificationScalarFieldEnum, {
  name: 'JobProfileClassificationScalarFieldEnum',
  description: undefined,
});
