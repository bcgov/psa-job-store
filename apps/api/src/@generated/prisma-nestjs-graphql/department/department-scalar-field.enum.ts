import { registerEnumType } from '@nestjs/graphql';

export enum DepartmentScalarFieldEnum {
  id = 'id',
  location_id = 'location_id',
  organization_id = 'organization_id',
  peoplesoft_id = 'peoplesoft_id',
  code = 'code',
  name = 'name',
  effective_status = 'effective_status',
  effective_date = 'effective_date',
}

registerEnumType(DepartmentScalarFieldEnum, { name: 'DepartmentScalarFieldEnum', description: undefined });
