import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileScalarFieldEnum {
  id = 'id',
  career_group_id = 'career_group_id',
  job_family_id = 'job_family_id',
  organization_id = 'organization_id',
  role_id = 'role_id',
  state = 'state',
  stream_id = 'stream_id',
  type = 'type',
  title = 'title',
  number = 'number',
  overview = 'overview',
  accountabilities = 'accountabilities',
  requirements = 'requirements',
}

registerEnumType(JobProfileScalarFieldEnum, { name: 'JobProfileScalarFieldEnum', description: undefined });
