import { registerEnumType } from '@nestjs/graphql';

export enum DepartmentOrderByRelevanceFieldEnum {
  id = 'id',
  organization_id = 'organization_id',
  name = 'name',
}

registerEnumType(DepartmentOrderByRelevanceFieldEnum, {
  name: 'DepartmentOrderByRelevanceFieldEnum',
  description: undefined,
});
