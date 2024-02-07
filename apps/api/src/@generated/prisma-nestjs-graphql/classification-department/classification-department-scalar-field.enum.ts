import { registerEnumType } from '@nestjs/graphql';

export enum ClassificationDepartmentScalarFieldEnum {
  classification_id = 'classification_id',
  department_id = 'department_id',
}

registerEnumType(ClassificationDepartmentScalarFieldEnum, {
  name: 'ClassificationDepartmentScalarFieldEnum',
  description: undefined,
});
