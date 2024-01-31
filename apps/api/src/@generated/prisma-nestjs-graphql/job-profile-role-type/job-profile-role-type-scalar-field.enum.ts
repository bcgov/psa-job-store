import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileRoleTypeScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(JobProfileRoleTypeScalarFieldEnum, {
  name: 'JobProfileRoleTypeScalarFieldEnum',
  description: undefined,
});
