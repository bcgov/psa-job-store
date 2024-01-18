import { registerEnumType } from '@nestjs/graphql';

export enum EmployeeGroupScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(EmployeeGroupScalarFieldEnum, { name: 'EmployeeGroupScalarFieldEnum', description: undefined });
