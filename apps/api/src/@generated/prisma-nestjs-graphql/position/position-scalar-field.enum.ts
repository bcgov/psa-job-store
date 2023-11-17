import { registerEnumType } from '@nestjs/graphql';

export enum PositionScalarFieldEnum {
  id = 'id',
  classification_id = 'classification_id',
  department_id = 'department_id',
  organization_id = 'organization_id',
  supervisor_id = 'supervisor_id',
  title = 'title',
  job_profile_number = 'job_profile_number',
  is_empty = 'is_empty',
  is_vacant = 'is_vacant',
}

registerEnumType(PositionScalarFieldEnum, { name: 'PositionScalarFieldEnum', description: undefined });
