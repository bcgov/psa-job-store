import { registerEnumType } from '@nestjs/graphql';

export enum EmployeeOrderByRelevanceFieldEnum {
  id = 'id',
  classification_id = 'classification_id',
  department_id = 'department_id',
  organization_id = 'organization_id',
  name = 'name',
}

registerEnumType(EmployeeOrderByRelevanceFieldEnum, {
  name: 'EmployeeOrderByRelevanceFieldEnum',
  description: undefined,
});
