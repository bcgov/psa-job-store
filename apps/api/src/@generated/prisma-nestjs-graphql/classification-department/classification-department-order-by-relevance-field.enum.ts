import { registerEnumType } from '@nestjs/graphql';

export enum ClassificationDepartmentOrderByRelevanceFieldEnum {
  classification_id = 'classification_id',
  department_id = 'department_id',
}

registerEnumType(ClassificationDepartmentOrderByRelevanceFieldEnum, {
  name: 'ClassificationDepartmentOrderByRelevanceFieldEnum',
  description: undefined,
});
