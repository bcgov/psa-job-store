import { registerEnumType } from '@nestjs/graphql';

export enum EmployeeGroupOrderByRelevanceFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(EmployeeGroupOrderByRelevanceFieldEnum, {
  name: 'EmployeeGroupOrderByRelevanceFieldEnum',
  description: undefined,
});
