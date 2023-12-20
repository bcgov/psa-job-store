import { registerEnumType } from '@nestjs/graphql';

export enum PositionEmployeeOrderByRelevanceFieldEnum {
  employee_id = 'employee_id',
  position_id = 'position_id',
}

registerEnumType(PositionEmployeeOrderByRelevanceFieldEnum, {
  name: 'PositionEmployeeOrderByRelevanceFieldEnum',
  description: undefined,
});
