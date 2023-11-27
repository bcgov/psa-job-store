import { registerEnumType } from '@nestjs/graphql';

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  LEAVE = 'LEAVE',
  LEAVE_WO_PAY = 'LEAVE_WO_PAY',
}

registerEnumType(EmployeeStatus, { name: 'EmployeeStatus', description: undefined });
