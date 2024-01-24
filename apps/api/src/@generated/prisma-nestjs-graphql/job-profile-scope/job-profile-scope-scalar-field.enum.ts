import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileScopeScalarFieldEnum {
  id = 'id',
  name = 'name',
  description = 'description',
}

registerEnumType(JobProfileScopeScalarFieldEnum, { name: 'JobProfileScopeScalarFieldEnum', description: undefined });
