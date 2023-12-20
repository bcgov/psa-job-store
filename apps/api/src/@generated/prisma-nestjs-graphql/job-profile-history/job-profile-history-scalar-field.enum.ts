import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileHistoryScalarFieldEnum {
  id = 'id',
  job_profile_id = 'job_profile_id',
  json = 'json',
  created_at = 'created_at',
  created_by = 'created_by',
  updated_at = 'updated_at',
  updated_by = 'updated_by',
  deleted_at = 'deleted_at',
  deleted_by = 'deleted_by',
}

registerEnumType(JobProfileHistoryScalarFieldEnum, {
  name: 'JobProfileHistoryScalarFieldEnum',
  description: undefined,
});
