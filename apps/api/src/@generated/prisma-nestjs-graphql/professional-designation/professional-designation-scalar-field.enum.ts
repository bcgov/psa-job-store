import { registerEnumType } from '@nestjs/graphql';

export enum ProfessionalDesignationScalarFieldEnum {
  id = 'id',
  employee_group_id = 'employee_group_id',
  name = 'name',
}

registerEnumType(ProfessionalDesignationScalarFieldEnum, {
  name: 'ProfessionalDesignationScalarFieldEnum',
  description: undefined,
});
