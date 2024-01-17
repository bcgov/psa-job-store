import { registerEnumType } from '@nestjs/graphql';

export enum ClassificationOrderByRelevanceFieldEnum {
  id = 'id',
  peoplesoft_id = 'peoplesoft_id',
  code = 'code',
  name = 'name',
  employee_group = 'employee_group',
  grade = 'grade',
  effective_status = 'effective_status',
}

registerEnumType(ClassificationOrderByRelevanceFieldEnum, {
  name: 'ClassificationOrderByRelevanceFieldEnum',
  description: undefined,
});
