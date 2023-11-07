import { registerEnumType } from '@nestjs/graphql';

export enum JobRoleScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(JobRoleScalarFieldEnum, { name: 'JobRoleScalarFieldEnum', description: undefined });
