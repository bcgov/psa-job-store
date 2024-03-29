import { registerEnumType } from '@nestjs/graphql';

export enum ClassificationScalarFieldEnum {
  id = 'id',
  peoplesoft_id = 'peoplesoft_id',
  code = 'code',
  name = 'name',
  employee_group_id = 'employee_group_id',
  grade = 'grade',
  effective_status = 'effective_status',
  effective_date = 'effective_date',
}

registerEnumType(ClassificationScalarFieldEnum, { name: 'ClassificationScalarFieldEnum', description: undefined });
