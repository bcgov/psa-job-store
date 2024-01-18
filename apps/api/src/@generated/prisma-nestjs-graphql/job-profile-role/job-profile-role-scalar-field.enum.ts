import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileRoleScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(JobProfileRoleScalarFieldEnum, { name: 'JobProfileRoleScalarFieldEnum', description: undefined });
