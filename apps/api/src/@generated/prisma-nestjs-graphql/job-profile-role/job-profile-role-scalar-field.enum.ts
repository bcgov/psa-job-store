import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileRoleScalarFieldEnum {
  id = 'id',
  type = 'type',
  name = 'name',
}

registerEnumType(JobProfileRoleScalarFieldEnum, { name: 'JobProfileRoleScalarFieldEnum', description: undefined });
