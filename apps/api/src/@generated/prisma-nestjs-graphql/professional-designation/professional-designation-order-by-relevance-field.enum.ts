import { registerEnumType } from '@nestjs/graphql';

export enum ProfessionalDesignationOrderByRelevanceFieldEnum {
  employee_group_id = 'employee_group_id',
  name = 'name',
}

registerEnumType(ProfessionalDesignationOrderByRelevanceFieldEnum, {
  name: 'ProfessionalDesignationOrderByRelevanceFieldEnum',
  description: undefined,
});
