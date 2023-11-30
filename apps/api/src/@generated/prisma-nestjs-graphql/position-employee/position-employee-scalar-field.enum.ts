import { registerEnumType } from '@nestjs/graphql';

export enum PositionEmployeeScalarFieldEnum {
  employee_id = 'employee_id',
  position_id = 'position_id',
}

registerEnumType(PositionEmployeeScalarFieldEnum, { name: 'PositionEmployeeScalarFieldEnum', description: undefined });
