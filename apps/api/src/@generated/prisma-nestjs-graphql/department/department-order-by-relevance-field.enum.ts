import { registerEnumType } from '@nestjs/graphql';

export enum DepartmentOrderByRelevanceFieldEnum {
  id = 'id',
  location_id = 'location_id',
  organization_id = 'organization_id',
  peoplesoft_id = 'peoplesoft_id',
  code = 'code',
  name = 'name',
  effective_status = 'effective_status',
}

registerEnumType(DepartmentOrderByRelevanceFieldEnum, {
  name: 'DepartmentOrderByRelevanceFieldEnum',
  description: undefined,
});
