import { registerEnumType } from '@nestjs/graphql';

export enum EmployeeScalarFieldEnum {
  id = 'id',
  classification_id = 'classification_id',
  department_id = 'department_id',
  organization_id = 'organization_id',
  name = 'name',
  status = 'status',
}

registerEnumType(EmployeeScalarFieldEnum, { name: 'EmployeeScalarFieldEnum', description: undefined });
