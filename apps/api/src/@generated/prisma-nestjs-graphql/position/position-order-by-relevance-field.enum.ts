import { registerEnumType } from '@nestjs/graphql';

export enum PositionOrderByRelevanceFieldEnum {
  id = 'id',
  classification_id = 'classification_id',
  department_id = 'department_id',
  organization_id = 'organization_id',
  supervisor_id = 'supervisor_id',
  title = 'title',
  number = 'number',
  job_profile_number = 'job_profile_number',
}

registerEnumType(PositionOrderByRelevanceFieldEnum, {
  name: 'PositionOrderByRelevanceFieldEnum',
  description: undefined,
});
