import { registerEnumType } from '@nestjs/graphql';

export enum DepartmentScalarFieldEnum {
  id = 'id',
  organization_id = 'organization_id',
  name = 'name',
}

registerEnumType(DepartmentScalarFieldEnum, { name: 'DepartmentScalarFieldEnum', description: undefined });
