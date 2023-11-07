import { registerEnumType } from '@nestjs/graphql';

export enum MinistryScalarFieldEnum {
  id = 'id',
  code = 'code',
  name = 'name',
}

registerEnumType(MinistryScalarFieldEnum, { name: 'MinistryScalarFieldEnum', description: undefined });
