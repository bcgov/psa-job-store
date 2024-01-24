import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileStreamScalarFieldEnum {
  id = 'id',
  job_family_id = 'job_family_id',
  name = 'name',
}

registerEnumType(JobProfileStreamScalarFieldEnum, { name: 'JobProfileStreamScalarFieldEnum', description: undefined });
